import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { TimeTrackingService } from '../../services/time-tracking.service';
import { Task } from '../../models/task';
import { DataService } from 'src/app/services/data-service.service';

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
      thirdCtrl: ['', Validators.required],
    });
  }

  async closeBottomSheet(data) {
    console.log('passed data to closeBottomSheet()', data);
    if (!data) {
      this.bottomsheet.dismiss();
      return;
    }

    let [title, startDate, startTime, endDate, endTime] = data;

    let startDateObject = new Date(startDate + ' ' + startTime);
    let endDateObject = new Date(endDate + ' ' + endTime);

    this.dataService
      .getTimeTrackingService()
      .add(title, startDate, endDate, this.dataService.currentTask);
    this.bottomsheet.dismiss();
  }
}
