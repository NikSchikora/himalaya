import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { NewTaskDialogComponent } from '../../components/new-task-dialog/new-task-dialog.component';
import { EditTaskBottomSheetComponent } from '../../components/edit-task-bottom-sheet/edit-task-bottom-sheet.component';
import { NewTimeTrackingBottomSheetComponent } from '../../components/new-time-tracking-bottom-sheet/new-time-tracking-bottom-sheet.component';
import { Task } from '../../models/task';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export class ActivitiesComponent implements OnInit {
  tasks: Task[] = [];

  constructor(
    private tasksService: TasksService,
    public dialog: MatDialog,
    private editTaskBottomSheet: MatBottomSheet,
    private newTimeTrackingBottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  toggleLikeStatus(): void {
    let target: any = event.target || event.srcElement || event.currentTarget;
    let status: string = target.getAttribute('data-status');

    if (status === 'unliked') {
      target.setAttribute('data-status', 'liked');
      target.innerHTML = 'favorite';

      // Datenbankeintrag updaten
    } else if (status === 'liked') {
      target.setAttribute('data-status', 'unliked');
      target.innerHTML = 'favorite_border';

      // Datenbankeintrag updaten
    }
  }

  openNewTaskDialog(): void {
    const dialogRef = this.dialog.open(NewTaskDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.add(result[0], result[1]);
    });
  }

  openBottomSheet(task: Task): void {
    // Je nachdem auf welche Task geklickt wurde,
    // müssen die jeweiligen Infos an die Komponente übergeben werden

    const editTaskBottomSheetRef = this.editTaskBottomSheet.open(
      EditTaskBottomSheetComponent,
      {
        data: {
          task,
        },
      }
    );

    editTaskBottomSheetRef.afterDismissed().subscribe((result) => {
      if (result) {
        this.openNewTimeTrackingBottomSheet(task);
      }
    });
  }

  openNewTimeTrackingBottomSheet(task: Task): void {
    console.log(task);
    const bottomSheetRef = this.newTimeTrackingBottomSheet.open(
      NewTimeTrackingBottomSheetComponent,
      {
        data: {
          task,
        },
      }
    );

    bottomSheetRef.afterDismissed().subscribe((result) => {
      if (result) {
        this.add(result[0], result[1]);
      }

      this.openBottomSheet(task);
    });
  }

  async getAll() {
    this.tasks = await this.tasksService.getAll();
  }

  async add(title: string, description = '') {
    await this.tasksService.add(title, description);
    this.getAll();
  }
}
