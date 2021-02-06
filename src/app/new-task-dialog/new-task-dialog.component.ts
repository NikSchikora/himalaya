import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-task-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.css']
})
export class NewTaskDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewTaskDialogComponent>) {}

  ngOnInit(): void {
  }

  enableSubmitButton(title, description) {

    let title_value = title.value;
    let description_value = description.value;

    if (title_value !== "" && description_value !== "") {
      document.querySelector<HTMLElement>("#disabledButton").style.display = "none";
      document.querySelector<HTMLElement>("#enabledButton").style.display = "block";

    } else {
      document.querySelector<HTMLElement>("#enabledButton").style.display = "none";
      document.querySelector<HTMLElement>("#disabledButton").style.display = "block";
    }
  }
}
