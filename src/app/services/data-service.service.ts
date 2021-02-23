import { Injectable, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskBottomSheetComponent } from '../components/edit-task-bottom-sheet/edit-task-bottom-sheet.component';
import { NewTaskDialogComponent } from '../components/new-task-dialog/new-task-dialog.component';
import { NewTimeTrackingBottomSheetComponent } from '../components/new-time-tracking-bottom-sheet/new-time-tracking-bottom-sheet.component';
import { Task } from '../models/task';
import { TaskService } from './task.service';
import { TimeTrackingService } from './time-tracking.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private tasks: Task[] = [];
  private currentTask = null;

  constructor(
    private taskService: TaskService,
    private timeTrackingService: TimeTrackingService,
    public dialog: MatDialog,
    public bottomSheet: MatBottomSheet
  ) {
    this.fetchTasks();
  }

  openNewTaskDialog() {
    const dialogRef = this.dialog.open(NewTaskDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (!result) {
        return;
      }

      this.taskService.add(result[0], result[1]);
      this.fetchTasks();
    });
  }

  openNewTimeTrackingBottomSheet() {
    const bottomSheetRef = this.bottomSheet.open(
      NewTimeTrackingBottomSheetComponent
    );

    bottomSheetRef.afterDismissed().subscribe((result) => {
      if (result) {
        this.timeTrackingService.add(
          result[0],
          result[1],
          result[2],
          this.currentTask
        );
      }

      this.openTaskBottomSheet(this.currentTask);
    });
  }

  openTaskBottomSheet(task: Task) {
    // Je nachdem auf welche Task geklickt wurde,
    // müssen die jeweiligen Infos an die Komponente übergeben werden

    console.log(task);
    this.currentTask = task;

    const editTaskBottomSheetRef = this.bottomSheet.open(
      EditTaskBottomSheetComponent
    );

    editTaskBottomSheetRef.afterDismissed().subscribe((result) => {
      if (result) {
        this.openNewTimeTrackingBottomSheet();
      }
    });
  }

  async fetchTasks() {
    console.log('fetch tasks');
    this.tasks = await this.taskService.getAll();
  }

  getTasks() {
    console.log('tasks are displayed', this.tasks);
    return this.tasks;
  }

  getTasksService() {
    return this.taskService;
  }

  getTimeTrackingService() {
    return this.timeTrackingService;
  }
}
