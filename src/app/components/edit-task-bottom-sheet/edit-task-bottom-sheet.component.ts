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
    await this.dataService.fetchTasks();
    this.dataService.fetchCurrentTask();
    const currentTask = this.dataService.currentTask;

    this.dataService.getTaskService().toggleLikeStatus(currentTask);
  }

  openNewTimeTrackingBottomSheet(): void {
    this.bottomSheet.dismiss(true);
  }

  getRelatedTimeTrackings() {
    const currentTask = this.dataService.currentTask;

    return this.dataService.timeTrackings.filter(
      (timeTracking: TimeTracking) => timeTracking.taskId === currentTask.id
    );
  }
}
