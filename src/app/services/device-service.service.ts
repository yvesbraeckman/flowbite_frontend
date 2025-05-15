import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Device from '../../types'

@Injectable({
  providedIn: 'root'
})

export class DeviceServiceService {
  private _devices: Device[] = [
    {
      name: "Station 1 - Galileo",
      battery: 50,
      status: true
    },
    {
      name: "Station 2 - Columbus",
      battery: 89,
      status: true
    },
    {
      name: "Station 3 - Kepler",
      battery: 67,
      status: false
    },
    {
      name: "Station 4 - Planck",
      battery: 33,
      status: true
    },
    {
      name: "Station 5 - Hubble",
      battery: 55,
      status: true
    },
    {
      name: "Station 6 - Fermi",
      battery: 98,
      status: false
    },
  ];

  private _currentDevice: Device = this._devices[0];


  constructor(private client: HttpClient) { 

  }

  public get devices(): Device[] {
    return this._devices;
  }
  public set devices(value: Device[]) {
    this._devices = value;
  }
  public get currentDevice(): Device {
    return this._currentDevice;
  }
  public set currentDevice(value: Device) {
    this._currentDevice = value;
  }


}
