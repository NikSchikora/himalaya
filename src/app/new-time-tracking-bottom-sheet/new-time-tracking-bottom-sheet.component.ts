import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { TimeTrackingService } from '../time-tracking.service';
import { Task } from '../task';
import { Optional } from '@angular/core';

@Component({
  selector: 'app-new-time-tracking-bottom-sheet',
  templateUrl: './new-time-tracking-bottom-sheet.component.html',
  styleUrls: ['./new-time-tracking-bottom-sheet.component.css'],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
})
export class NewTimeTrackingBottomSheetComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  isOptional = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: Task },
    private timeTrackingService: TimeTrackingService,
    private _formBuilder: FormBuilder,
    private bottomsheet: MatBottomSheetRef<NewTimeTrackingBottomSheetComponent>
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      thirdCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      forthCtrl: ['', Validators.required],
      fifthCtrl: ['', Validators.required],
    });
  }

  closeBottomSheet(data) {
    let [title, startDate, startTime, endDate, endTime] = data;

    let startDateObject = new Date(startDate + ' ' + startTime);
    let endDateObject = new Date(endDate + ' ' + endTime);

    this.add(title, startDateObject, endDateObject, this.data.task);
    this.bottomsheet.dismiss(data);
  }

  async add(title: string, startDate: Date, endDate: Date, task: Task) {
    await this.timeTrackingService.add(title, startDate, endDate, task);
  }
}
