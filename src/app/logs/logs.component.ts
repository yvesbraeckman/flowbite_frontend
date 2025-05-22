import { Component, HostListener } from '@angular/core';
import { DeviceServiceService } from '../services/device-service.service';
import Device from '../../types'

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

  constructor(private service: DeviceServiceService){
    this.devices = service.devices
    this.currentDevice = service.currentDevice
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



downloadData(start: string, stop: string) {
  this.setStart(start);
  this.setStop(stop);

  const exportAndDownload = (data: number[][], sensor: string) => {
    if (!data || data.length === 0) return;

    // Zet om naar CSV of plain text
    const logText = `timestamp,value\n` + data.map(d => `${new Date(d[0]).toISOString()},${d[1]}`).join('\n');

    const blob = new Blob([logText], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${sensor}_${start}_to_${stop}.csv`;
    a.click();

    URL.revokeObjectURL(url);
  };

  switch (this.sensor) {
    case "temperature":
      this.service.getTemperature(this.start, this.stop).subscribe(data => {
        exportAndDownload(data, 'temperature');
      });
      break;
    case "humidity":
      this.service.getHumidity(this.start, this.stop).subscribe(data => {
        exportAndDownload(data, 'humidity');
      });
      break;
    case "pressure":
      this.service.getPressure(this.start, this.stop).subscribe(data => {
        exportAndDownload(data, 'pressure');
      });
      break;
    case "tippings":
      this.service.getTippings(this.start, this.stop).subscribe(data => {
        exportAndDownload(data, 'tippings');
      });
      break;
    default:
      console.warn('Geen sensor geselecteerd');
      break;
  }
}


}

