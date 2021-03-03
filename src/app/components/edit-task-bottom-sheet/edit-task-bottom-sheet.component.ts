import { Time } from '@angular/common';
import { Optional } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Task } from 'src/app/models/task';
import { DataService } from 'src/app/services/data-service.service';
import { TimeTracking } from '../../models/time-tracking';

@Component({
  selector: 'app-edit-task-bottom-sheet',
  templateUrl: './edit-task-bottom-sheet.component.html',
  styleUrls: ['./edit-task-bottom-sheet.component.css'],
})
export class EditTaskBottomSheetComponent implements OnInit {
  timeTrackings: TimeTracking[] = [];

  constructor(
    public dataService: DataService,
    private bottomSheet: MatBottomSheetRef<EditTaskBottomSheetComponent>
  ) {}

  ngOnInit(): void {}

  async toggleLikeStatus() {
    this.dataService
      .getTaskService()
      .toggleLikeStatus(this.dataService.currentTask);
    this.dataService.fetchTasks();
  }

  openNewTimeTrackingBottomSheet(): void {
    this.bottomSheet.dismiss(true);
  }

  getRelatedTimeTrackings() {
    return this.dataService.timeTrackings.filter(
      (timeTracking: TimeTracking) =>
        timeTracking.taskId === this.dataService.currentTask.id
    );
  }

  deleteTimeTracking(timeTracking: TimeTracking) {
    this.dataService.getTimeTrackingService().remove(timeTracking);
    this.dataService.fetchTimeTrackings();
  }
}
