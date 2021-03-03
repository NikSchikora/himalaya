import { TimeTracking } from 'src/app/models/time-tracking';
import { Task } from './../../models/task';
import { DataService } from 'src/app/services/data-service.service';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet, SingleDataSet } from 'ng2-charts';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-projects',
  templateUrl: './dashboard-projects.component.html',
  styleUrls: ['./dashboard-projects.component.css'],
})
export class DashboardProjectsComponent implements OnInit {
  public projectChartLabels: Label[] = [];
  public projectChartData: SingleDataSet = [];
  public projectChartType: ChartType = 'doughnut';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchTrackings();
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

  public async fetchTrackings() {
    let tasks = await this.dataService.tasks;
    tasks.forEach((task: Task) => {
      let hours: number = 0;
      this.getTimeTrackings(task.id).forEach((tracking: TimeTracking) => {
        hours += tracking.duration.hours;
        if (tracking.duration.minutes > 30) {
          hours++;
        }
      });
      this.projectChartData.push(hours);
      this.projectChartLabels.push(task.title);
    });
  }

  public getTimeTrackings(id: string) {
    return this.dataService.timeTrackings.filter(
      (timeTracking: TimeTracking) => timeTracking.taskId === id
    );
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
