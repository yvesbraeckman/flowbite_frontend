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
      battery: 4.3,
      status: true
    },
    {
      name: "Station 2 - Columbus",
      battery: 4.10,
      status: true
    },
    {
      name: "Station 3 - Kepler",
      battery: 0.0,
      status: false
    },
    {
      name: "Station 4 - Planck",
      battery: 4.30,
      status: true
    },
    {
      name: "Station 5 - Hubble",
      battery: 4.50,
      status: true
    },
    {
      name: "Station 6 - Fermi",
      battery: 0.0,
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
    return this.client.get<any[]>('http://bsaffer.rombouts.tech:3000/API/temperature?start=-4h').pipe(
      map((data) =>
        data.map((item) => [
          new Date(item._time).getTime(),
          item._value
        ])
      )
    );
  }

    getHumidity(): Observable<number[][]> {
    return this.client.get<any[]>('http://bsaffer.rombouts.tech:3000/API/humidity?start=-4h').pipe(
      map((data) =>
        data.map((item) => [
          new Date(item._time).getTime(),
          item._value
        ])
      )
    );
  }

      getPressure(): Observable<number[][]> {
    return this.client.get<any[]>('http://bsaffer.rombouts.tech:3000/API/pressure?start=-4h').pipe(
      map((data) =>
        data.map((item) => [
          new Date(item._time).getTime(),
          item._value
        ])
      )
    );
  }

        getTippings(): Observable<number[][]> {
    return this.client.get<any[]>('http://bsaffer.rombouts.tech:3000/API/tippings?start=-4h').pipe(
      map((data) =>
        data.map((item) => [
          new Date(item._time).getTime(),
          item._value
        ])
      )
    );
  }

  getLatestVoltage(): Observable<number> {
    return this.client.get<any[]>('http://bsaffer.rombouts.tech:3000/API/voltage?start=-4h').pipe(
      map((data) => {
        if (!data.length) throw new Error('No data found');
        const latest = data[data.length - 1];
        return latest._value;
      })
    );
  }

}
