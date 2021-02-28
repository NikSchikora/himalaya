import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { NewTaskDialogComponent } from '../../components/new-task-dialog/new-task-dialog.component';
import { EditTaskBottomSheetComponent } from '../../components/edit-task-bottom-sheet/edit-task-bottom-sheet.component';
import { NewTimeTrackingBottomSheetComponent } from '../../components/new-time-tracking-bottom-sheet/new-time-tracking-bottom-sheet.component';
import { Task } from '../../models/task';
import { DataService } from 'src/app/services/data-service.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export class ActivitiesComponent implements OnInit {
  constructor(public dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.fetchTasks();
  }

  toggleLikeStatus(task: Task) {
    this.dataService.getTaskService().toggleLikeStatus(task);
    this.dataService.fetchTasks();
  }
}
