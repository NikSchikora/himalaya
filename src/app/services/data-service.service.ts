import { Injectable, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { EditTaskBottomSheetComponent } from '../components/edit-task-bottom-sheet/edit-task-bottom-sheet.component';
import { NewTaskDialogComponent } from '../components/new-task-dialog/new-task-dialog.component';
import { NewTimeTrackingBottomSheetComponent } from '../components/new-time-tracking-bottom-sheet/new-time-tracking-bottom-sheet.component';
import { Task } from '../models/task';
import { TimeTracking } from '../models/time-tracking';
import { TaskService } from './task.service';
import { TimeTrackingService } from './time-tracking.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly _tasks = new BehaviorSubject<Task[]>([]);
  readonly tasks$ = this._tasks.asObservable();

  private readonly _timeTrackings = new BehaviorSubject<TimeTracking[]>([]);
  readonly timeTrackings$ = this._timeTrackings.asObservable();

  private readonly _currentTask = new BehaviorSubject<string>(null);
  readonly currentTask$ = null;

  constructor(
    private taskService: TaskService,
    private timeTrackingService: TimeTrackingService,
    public dialog: MatDialog,
    public bottomSheet: MatBottomSheet
  ) {
    this.fetchTasks();
    this.fetchTimeTrackings();
  }

  get tasks(): Task[] {
    return this._tasks.getValue();
  }

  set tasks(val: Task[]) {
    this._tasks.next(val);
  }

  get timeTrackings(): TimeTracking[] {
    return this._timeTrackings.getValue();
  }

  set timeTrackings(val: TimeTracking[]) {
    this._timeTrackings.next(val);
  }

  get currentTask(): Task {
    const currentTaskId = this._currentTask.value;

    if (!currentTaskId) {
      return null;
    }

    return this.tasks.find((task) => task.id === currentTaskId);
  }

  set currentTask(val: Task) {
    this._currentTask.next(val.id);
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

    bottomSheetRef.afterDismissed().subscribe((res) => {
      this.fetchTimeTrackings();
      this.openTaskBottomSheet(this.currentTask);
    });
  }

  openTaskBottomSheet(task: Task) {
    // Je nachdem auf welche Task geklickt wurde,
    // müssen die jeweiligen Infos an die Komponente übergeben werden

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
    this.tasks = [...(await this.taskService.getAll())];
  }

  async fetchTimeTrackings() {
    console.log('fetch timeTrackings');
    this.timeTrackings = [...(await this.timeTrackingService.getAll())];
  }

  public getTaskService() {
    return this.taskService;
  }

  public getTimeTrackingService() {
    return this.timeTrackingService;
  }
}
