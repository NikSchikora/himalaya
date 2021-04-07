import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data-service.service';
import { Component, OnInit } from '@angular/core';
import { TimeTracking } from 'src/app/models/time-tracking';

@Component({
  selector: 'app-total-timetracking',
  templateUrl: './total-timetracking.component.html',
  styleUrls: ['./total-timetracking.component.css'],
})
export class TotalTimetrackingComponent implements OnInit {
  totalTime: number = 0;
  totalTimeMinutes: number = 0;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.calculateTotalTime();
  }

  async calculateTotalTime() {
    this.dataService.timeTrackings$.subscribe((data) => {
      this.totalTime = 0;
      this.totalTimeMinutes = 0;
      data.forEach((tracking: TimeTracking) => {
        this.totalTime +=
          tracking.duration.hours +
          (tracking.duration.minutes - (tracking.duration.minutes % 60)) / 60;
        this.totalTimeMinutes += tracking.duration.minutes;
        if (this.totalTimeMinutes > 59) {
          this.totalTime++;
          this.totalTimeMinutes -= 60;
        }
      });
    });
  }
}
