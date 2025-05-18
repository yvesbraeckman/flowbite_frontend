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

  temperatuur: number[][] = [];
  humidity: number[][] = [];
  pressure: number[][] = [];
  tippings: number[][] = []; 

  tempLoaded: boolean = false
  humLoaded: boolean = false
  tipLoaded: boolean = false
  presLoaded: boolean = false

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
  }
}

