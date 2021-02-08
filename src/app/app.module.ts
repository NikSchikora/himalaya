import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActivitiesComponent } from './activities/activities.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { NewTaskDialogComponent } from './new-task-dialog/new-task-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { EditTaskBottomSheetComponent } from './edit-task-bottom-sheet/edit-task-bottom-sheet.component';
import { MatStepperModule } from '@angular/material/stepper';
import { NewTimeTrackingBottomSheetComponent } from './new-time-tracking-bottom-sheet/new-time-tracking-bottom-sheet.component';
import { DashboardWeeklyComponent } from './dashboard-weekly/dashboard-weekly.component';
import { MatCardModule } from '@angular/material/card';
import { ChartsModule } from 'ng2-charts';
import { DashboardProjectsComponent } from './dashboard-projects/dashboard-projects.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ActivitiesComponent,
    NavComponent,
    NewTaskDialogComponent,
    EditTaskBottomSheetComponent,
    NewTimeTrackingBottomSheetComponent,
    DashboardWeeklyComponent,
    DashboardProjectsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatBottomSheetModule,
    MatCardModule,
    MatStepperModule,
    ChartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(swUpdate: SwUpdate, matSnackBar: MatSnackBar) {
    swUpdate.available.subscribe(() => {
      matSnackBar
        .open('A new version of this application is available!', 'Update')
        .onAction()
        .subscribe(() => {
          window.location.reload();
        });
    });
  }
}
