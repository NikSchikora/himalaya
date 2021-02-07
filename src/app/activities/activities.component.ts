import { EditTaskBottomSheetComponent } from './../edit-task-bottom-sheet/edit-task-bottom-sheet.component';
import { NewTaskDialogComponent } from './../new-task-dialog/new-task-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  constructor(public dialog: MatDialog, private _bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
  }

  toggleLikeStatus(): void {

    let target: any = event.target;
    let status: string = target.getAttribute("data-status");

    if (status === "unliked") {
      target.setAttribute("data-status", "liked");
      target.innerHTML = "favorite";

      // Datenbankeintrag updaten

    } else if (status === "liked") {
      target.setAttribute("data-status", "unliked");
      target.innerHTML = "favorite_border";

      // Datenbankeintrag updaten
    }
  }

  openNewTaskDialog(): void {
    const dialogRef = this.dialog.open(NewTaskDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      // Neuen Datensatz anlegen
      // Darstellung aktualisieren

    });
  }

  openBottomSheet(): void {

    // Je nachdem auf welche Task geklickt wurde,
    // müssen die jeweiligen Infos an die Komponente übergeben werden

    this._bottomSheet.open(EditTaskBottomSheetComponent);
  }
}
