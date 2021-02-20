import { Optional } from '@angular/core';
import { Component, OnInit, Output, Input, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimeTracking } from '../../models/time-tracking';
import { TimeTrackingService } from '../../services/time-tracking.service';

@Component({
  selector: 'app-edit-task-bottom-sheet',
  templateUrl: './edit-task-bottom-sheet.component.html',
  styleUrls: ['./edit-task-bottom-sheet.component.css'],
})
export class EditTaskBottomSheetComponent implements OnInit {
  timeTrackings: TimeTracking[] = [];

  constructor(
    private timeTrackingService: TimeTrackingService,
    private bottomSheet: MatBottomSheetRef<EditTaskBottomSheetComponent>
  ) {}

  ngOnInit(): void {}

  /*
  / Diese Methoden und die Methoden "toggleLikeStatus" der activitites-Componente funktionieren noch getrennt voneinander
  */
  toggleLikeStatus(): void {
    let target: any = event.target;
    let status: string = target.getAttribute('data-status');

    // TODO implement liking

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

  openNewTimeTrackingBottomSheet(): void {
    this.bottomSheet.dismiss(true);
  }

  async getAll() {
    this.timeTrackings = await this.timeTrackingService.getAll();
  }
}
