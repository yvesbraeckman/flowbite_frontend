import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
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

  getTemperature(): Observable<number[][]> {
    return this.client.get<any[]>('http://bsaffer.rombouts.tech:3000/API/temperature?range=-2h').pipe(
      map((data) =>
        data.map((item) => [
          new Date(item._time).getTime(),
          item._value
        ])
      )
    );
  }

    getHumidity(): Observable<number[][]> {
    return this.client.get<any[]>('http://bsaffer.rombouts.tech:3000/API/humidity?range=-2h').pipe(
      map((data) =>
        data.map((item) => [
          new Date(item._time).getTime(),
          item._value
        ])
      )
    );
  }

      getPressure(): Observable<number[][]> {
    return this.client.get<any[]>('http://bsaffer.rombouts.tech:3000/API/pressure?range=-2h').pipe(
      map((data) =>
        data.map((item) => [
          new Date(item._time).getTime(),
          item._value
        ])
      )
    );
  }

        getTippings(): Observable<number[][]> {
    return this.client.get<any[]>('http://bsaffer.rombouts.tech:3000/API/tippings?range=-2h').pipe(
      map((data) =>
        data.map((item) => [
          new Date(item._time).getTime(),
          item._value
        ])
      )
    );
  }

}
