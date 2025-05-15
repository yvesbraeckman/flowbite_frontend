import { Component, ViewChild } from '@angular/core';
import { ChartsComponent } from '../charts/charts.component';
import { DeviceServiceService } from '../services/device-service.service';
import Device from '../../types'

@Component({
  selector: 'app-dashboard',
  imports: [ChartsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  name1: string = "Temperature"
  name2: string = "Humidity"
  name3: string = "Pressure"
  name4: string = "Tippings"
  
  currentDevice: Device

  temperatuur: number[][] = [];
  humidity: number[][] = [];
  pressure: number[][] = [];
  tippings: number[][] = []; 

constructor(private service: DeviceServiceService) {
    this.currentDevice = service.currentDevice;
    this.service.getTemperature().subscribe({
      next: (data) => {
        console.log('API data geladen in temperatuur:', data);
        this.temperatuur = data;
      },
      error: (error) => {
        console.error('Fout bij ophalen temperatuur:', error);
      }
    });
    this.service.getHumidity().subscribe({
      next: (data) => {
        console.log('API data geladen in humidity:', data);
        this.humidity = data;
      },
      error: (error) => {
        console.error('Fout bij ophalen humidity:', error);
      }
    });
    this.service.getPressure().subscribe({
      next: (data) => {
        console.log('API data geladen in pressure:', data);
        this.pressure = data;
      },
      error: (error) => {
        console.error('Fout bij ophalen pressure:', error);
      }
    });
    this.service.getTippings().subscribe({
      next: (data) => {
        console.log('API data geladen in tippings:', data);
        this.tippings = data;
      },
      error: (error) => {
        console.error('Fout bij ophalen tippings:', error);
      }
    });
  }
}

