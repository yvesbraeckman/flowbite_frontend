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

  constructor(private service: DeviceServiceService){
    this.devices = service.devices
    this.currentDevice = service.currentDevice
  }

  dropdownOpen1 = false;
  dropdownOpen2 = false;

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

  getCurrentDevice(){
    this.currentDevice = this.service.currentDevice
  }

}

