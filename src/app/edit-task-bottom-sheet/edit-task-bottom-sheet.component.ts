import { Component, OnInit, Output, Input } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-edit-task-bottom-sheet',
  templateUrl: './edit-task-bottom-sheet.component.html',
  styleUrls: ['./edit-task-bottom-sheet.component.css']
})
export class EditTaskBottomSheetComponent implements OnInit {

  constructor(private bottomSheet: MatBottomSheetRef<EditTaskBottomSheetComponent>) { }

  ngOnInit(): void {

  }

  /*
  / Diese Methoden und die Methoden "toggleLikeStatus" der activitites-Componente funktionieren noch getrennt voneinander
  */
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

  openNewTimeTrackingBottomSheet():void {

    this.bottomSheet.dismiss(true);
  }
}
