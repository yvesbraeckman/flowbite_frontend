import { Component, HostListener } from '@angular/core';
import { DeviceServiceService } from '../services/device-service.service';
import Device from '../../types'
import { initFlowbite } from 'flowbite';
import { forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-logs',
  imports: [],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css'
})
export class LogsComponent {
  devices: Device[] = []
  currentDevice: Device 
  dropdownOpen1: boolean = false;
  dropdownOpen2: boolean = false;
  sensor: string = ""
  start: string = ""
  stop: string = ""
  selectedSensors: string[] = [];

  constructor(private service: DeviceServiceService){
    this.devices = service.devices
    this.currentDevice = service.currentDevice
  }



  toggleSensor(sensor: string, event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      if (!this.selectedSensors.includes(sensor)) {
        this.selectedSensors.push(sensor);
      }
    } else {
      this.selectedSensors = this.selectedSensors.filter(s => s !== sensor);
    }
  }


  toggleDropdown1() {
    this.dropdownOpen1 = !this.dropdownOpen1;
  }
  toggleDropdown2() {
    this.dropdownOpen2 = !this.dropdownOpen2;
  }

  setCurrentDevice(device: Device){
    this.service.currentDevice = device
    this.getCurrentDevice()
  }

  convertToISO(dateStr: string): string {
    const [month, day, year] = dateStr.split('/').map(Number);
    const isoDate = new Date(Date.UTC(year, month - 1, day));
    return isoDate.toISOString(); 
  }

  getCurrentDevice(){
    this.currentDevice = this.service.currentDevice
  }

  setSensor(sensor: string){
    this.sensor = sensor
  }

  setStart(start: string){
    this.start = this.convertToISO(start)
  }

  setStop(stop: string){
    this.stop = this.convertToISO(stop)
  }

  ngAfterViewInit() {
    initFlowbite();
  }

downloadData(start: string, stop: string) {
  this.setStart(start);
  this.setStop(stop);

  const sensorDataMap: Map<string, Map<number, number>> = new Map();
  const allTimestamps: Set<number> = new Set();

  const observables = this.selectedSensors.map(sensor => {
    switch (sensor) {
      case 'temperature':
        return this.service.getTemperature(this.start, this.stop).pipe(
          map((data: number[][]) => ({ sensor, data: data as [number, number][] }))
        );
      case 'humidity':
        return this.service.getHumidity(this.start, this.stop).pipe(
          map((data: number[][]) => ({ sensor, data: data as [number, number][] }))
        );
      case 'pressure':
        return this.service.getPressure(this.start, this.stop).pipe(
          map((data: number[][]) => ({ sensor, data: data as [number, number][] }))
        );
      case 'tippings':
        return this.service.getTippings(this.start, this.stop).pipe(
          map((data: number[][]) => ({ sensor, data: data as [number, number][] }))
        );
      default:
        return of({ sensor, data: [] as [number, number][] });
    }
  });

  forkJoin(observables).subscribe(results => {
    results.forEach(result => {
      const valueMap = new Map<number, number>();
      result.data.forEach(([timestamp, value]) => {
        valueMap.set(timestamp, value);
        allTimestamps.add(timestamp);
      });
      sensorDataMap.set(result.sensor, valueMap);
    });

    // Sorteer timestamps chronologisch
    const sortedTimestamps = Array.from(allTimestamps).sort((a, b) => a - b);

    // Maak CSV header
    const header = ['timestamp', ...this.selectedSensors];
    const lines = [header.join(',')];

    // Genereer CSV-rijen
    for (const ts of sortedTimestamps) {
      const row = [new Date(ts).toISOString()];
      for (const sensor of this.selectedSensors) {
        const val = sensorDataMap.get(sensor)?.get(ts);
        row.push(val !== undefined ? val.toString() : '');
      }
      lines.push(row.join(','));
    }

    // Download als CSV-bestand
    const csvContent = lines.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `logs_${start}_to_${stop}.csv`;
    a.click();

    URL.revokeObjectURL(url);
  });
}




}

