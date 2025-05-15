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

  tempData: number[][] = [
        [1741863600000, 1013],
        [1741863900000, 1010],
        [1741864200000, 1015],
        [1741864500000, 1008],
        [1741864800000, 1020],
        [1741865100000, 1005],
        [1741865400000, 1012],
        [1741865700000, 1017],
        [1741866000000, 1003],
        [1741866300000, 1011],
        [1741866600000, 1018],
        [1741866900000, 1009],
        [1741867200000, 1006],
        [1741867500000, 1014],
        [1741867800000, 1010],
        [1741868100000, 1021],
        [1741868400000, 1004],
        [1741868700000, 1012]    
    ];

    constructor(private service: DeviceServiceService){
      this.currentDevice = service.currentDevice

    }


}

