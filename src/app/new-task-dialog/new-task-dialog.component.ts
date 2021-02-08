import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-task-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.css']
})
export class NewTaskDialogComponent implements OnInit {

  firstFormGroup: FormGroup;
  isOptional = false;

  constructor(private _formBuilder: FormBuilder, private dialogRef: MatDialogRef<NewTaskDialogComponent>) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required]
    });
  }
}
