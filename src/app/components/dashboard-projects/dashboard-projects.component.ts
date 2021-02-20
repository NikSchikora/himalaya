import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-projects',
  templateUrl: './dashboard-projects.component.html',
  styleUrls: ['./dashboard-projects.component.css'],
})
export class DashboardProjectsComponent implements OnInit {
  public projectChartLabels: Label[] = ['Projekt 1', 'Projekt 2', 'Projekt 3'];
  public projectChartData: MultiDataSet = [[120, 50, 30]];
  public projectChartType: ChartType = 'doughnut';

  constructor() {}

  ngOnInit(): void {}

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

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
