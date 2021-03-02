import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { TimeTrackingService } from '../../services/time-tracking.service';
import { Task } from '../../models/task';
import { DataService } from 'src/app/services/data-service.service';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-new-time-tracking-bottom-sheet',
  templateUrl: './new-time-tracking-bottom-sheet.component.html',
  styleUrls: ['./new-time-tracking-bottom-sheet.component.css'],
})
export class NewTimeTrackingBottomSheetComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  isOptional = false;

  constructor(
    private dataService: DataService,
    private _formBuilder: FormBuilder,
    private bottomsheet: MatBottomSheetRef<NewTimeTrackingBottomSheetComponent>
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      thirdCtrl: [
        '',
        Validators.required,
        async (control: AbstractControl) => {
          if (control.value !== '00:00') return null;
          return { notANumber: 'Die Dauer hat keine Länge.' };
        },
      ],
    });
  }

  async closeBottomSheet(data) {
    if (!data) {
      this.bottomsheet.dismiss();
      return;
    }

    let [title, date, duration] = data;

    let durationParts = duration.split(':');

    this.dataService
      .getTimeTrackingService()
      .add(
        title,
        new Date(date),
        { hours: durationParts[0], minutes: durationParts[1] },
        this.dataService.currentTask
      );
    this.bottomsheet.dismiss();
  }
}
