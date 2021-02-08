import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-new-time-tracking-bottom-sheet',
  templateUrl: './new-time-tracking-bottom-sheet.component.html',
  styleUrls: ['./new-time-tracking-bottom-sheet.component.css']
})
export class NewTimeTrackingBottomSheetComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  isOptional = false;

  constructor(private _formBuilder: FormBuilder, private bottomsheet: MatBottomSheetRef<NewTimeTrackingBottomSheetComponent>) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      thirdCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      forthCtrl: ['', Validators.required],
      fifthCtrl: ['', Validators.required]
    });
  }

  closeBottomSheet(data){

    this.bottomsheet.dismiss(data);
  }
}


