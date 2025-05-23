import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartsComponent } from '../charts/charts.component';
import { DeviceServiceService } from '../services/device-service.service';
import Device from '../../types'

@Component({
  selector: 'app-dashboard',
  imports: [ChartsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  name1: string = "Temperature"
  name2: string = "Humidity"
  name3: string = "Pressure"
  name4: string = "Tippings"
  
  currentDevice: Device

  dropdownOpen1 = false;

  toggleDropdown1() {
    this.dropdownOpen1 = !this.dropdownOpen1;
  }

  temperatuur: number[][] = [];
  humidity: number[][] = [];
  pressure: number[][] = [];
  tippings: number[][] = []; 

  tempLoaded: boolean = false
  humLoaded: boolean = false
  tipLoaded: boolean = false
  presLoaded: boolean = false

  latestTemp: number | null = null;
  latestHumidity: number | null = null;
  latestPressure: number | null = null;
  latestTippings: number | null = null;


  constructor(private service: DeviceServiceService) {
    this.currentDevice = service.currentDevice;
  }

  ngOnInit(): void {
        this.service.getTemperature().subscribe({
      next: (data) => {
        console.log('API data geladen in temperatuur:', data);
        this.temperatuur = data;
        this.tempLoaded = true
      },
      error: (error) => {
        console.error('Fout bij ophalen temperatuur:', error);
      }
    });
    this.service.getHumidity().subscribe({
      next: (data) => {
        console.log('API data geladen in humidity:', data);
        this.humidity = data;
        this.humLoaded = true
      },
      error: (error) => {
        console.error('Fout bij ophalen humidity:', error);
      }
    });
    this.service.getPressure().subscribe({
      next: (data) => {
        console.log('API data geladen in pressure:', data);
        this.pressure = data;
        this.presLoaded = true
      },
      error: (error) => {
        console.error('Fout bij ophalen pressure:', error);
      }
    });
    this.service.getTippings().subscribe({
      next: (data) => {
        console.log('API data geladen in tippings:', data);
        this.tippings = data;
        this.tipLoaded = true
      },
      error: (error) => {
        console.error('Fout bij ophalen tippings:', error);
      }
    });
  this.service.getLatestTemperature().subscribe(data => this.latestTemp = data);
  this.service.getLatestHumidity().subscribe(data => this.latestHumidity = data);
  this.service.getLatestPressure().subscribe(data => this.latestPressure = data);
  this.service.getLatestTippings().subscribe(data => this.latestTippings = data);
  }

  loadNewData(range: string){
    this.service.getTippings(range).subscribe(data => {
      this.tippings = data
    })
    this.service.getHumidity(range).subscribe(data => {
      this.humidity = data
    })
    this.service.getPressure(range).subscribe(data => {
      this.pressure = data
    })
    this.service.getTemperature(range).subscribe(data => {
      this.temperatuur = data
    })
  }
}

