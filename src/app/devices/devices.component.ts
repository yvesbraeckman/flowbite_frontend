import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import Device from '../../types'
import { DeviceServiceService } from '../services/device-service.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-devices',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.css'
})
export class DevicesComponent {
  devices: Device[] = []
  currentDevice: any;
  
  constructor(private service: DeviceServiceService) {
    this.devices = service.devices
    service.getLatestVoltage().subscribe(data => {
        this.devices[0].battery = data
      }
    )
  }

  setCurrentDevice(device: Device){
    this.service.currentDevice = device
  }

  getVoltage(){
    this.service.getLatestVoltage().subscribe(data => {
        this.devices[0].battery = data
    })
  }
}
