import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import Device from '../../types'

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
  colors?: string[]
};

import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
  ApexStroke,
  NgApexchartsModule
} from "ng-apexcharts";
import { DeviceServiceService } from '../services/device-service.service';

@Component({
  selector: 'app-devices',
  imports: [NgApexchartsModule, RouterLink],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.css'
})
export class DevicesComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  devices: Device[] = []
  currentDevice: any;
  
  constructor(private service: DeviceServiceService) {
    this.devices = service.devices

    this.chartOptions = {
      colors: ["#e7000b"],
      series: [50],
      chart: {
        height: "auto",
        type: "radialBar",
        toolbar: {
          show: false
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -180,
          endAngle: 180,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#fff",
            image: undefined,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24
            }
          },
          track: {
            background: "#fff",
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35
            }
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px"
            },
            value: {
              formatter: function(val) {
                return parseInt(val.toString(), 10).toString();
              },
              color: "#111",
              fontSize: "36px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#e7000b", "#ffdf20"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["Battery"]
    };
  }

  setCurrentDevice(device: Device){
    this.service.currentDevice = device
  }
}
