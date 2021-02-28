import { TimeTrackingService } from './../../services/time-tracking.service';
import { Component, OnInit } from '@angular/core';
import { TimeTracking } from 'src/app/models/time-tracking';

@Component({
  selector: 'app-total-timetracking',
  templateUrl: './total-timetracking.component.html',
  styleUrls: ['./total-timetracking.component.css'],
})
export class TotalTimetrackingComponent implements OnInit {
  totalTime: number = 0;

  constructor(private timeTrackingService: TimeTrackingService) {}

  ngOnInit(): void {
    this.calculateTotalTime();
  }

  async calculateTotalTime() {
    let times: TimeTracking[] = await this.timeTrackingService.getAll();
    times.forEach((tracking: TimeTracking) => {
      this.totalTime +=
        tracking.endDate.getTime() - tracking.startDate.getTime();
    });
  }
}
