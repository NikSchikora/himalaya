import { TimeTracking } from 'src/app/models/time-tracking';
import { DataService } from 'src/app/services/data-service.service';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard-yearly',
  templateUrl: './dashboard-yearly.component.html',
  styleUrls: ['./dashboard-yearly.component.css'],
})
export class DashboardYearlyComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartLabels: Label[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Job-hours tracked',
    },
  ];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadYearlyData();
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public async loadYearlyData() {
    for (let i = 0; i < 12; i++) {
      let monthly: number = 0;
      this.dataService.timeTrackings.forEach((tracking: TimeTracking) => {
        if (tracking.date.getMonth() == i) {
          monthly = monthly + tracking.duration.hours;
          if (tracking.duration.minutes > 30) {
            monthly++;
          }
        }
      });
      this.barChartData[0].data.push(monthly);
    }
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.random() * 100,
      56,
      Math.random() * 100,
      40,
    ];
  }
}
