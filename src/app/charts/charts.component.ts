import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";
import { NgApexchartsModule } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-charts',
  imports: [NgApexchartsModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent implements OnChanges { //(voor yves: ik heb naar onchanges veranderd door een timing probleem)
  @ViewChild("chart") chart!: ChartComponent;
  @Input() sensorData?: number[][];
  @Input() name: string; 

  constructor(){
    this.name = ""
  }

  public chartOptions!: Partial<ChartOptions>;

  ngOnChanges() {
    console.log('sensorData in ngOnChanges:', this.sensorData); // Log de data
    this.chartOptions = {
      series: [
        {
          name: "series1",
          data: this.sensorData!
        }
      ],
      chart: {
        toolbar: { show: false },
        type: "area",
        zoom: { enabled: false },
        height: "320"
      },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth" },
      xaxis: { type: "datetime" },
      tooltip: { x: { format: "dd/MM/yy HH:mm" } }
    };
  }
}
