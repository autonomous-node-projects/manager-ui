import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { UploadComponent } from './upload/upload.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectsMenuComponent } from './projects-menu/projects-menu.component';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { PopUpDialogComponent } from './pop-up-dialog/pop-up-dialog.component';
import { AlertsComponent } from './alerts/alerts.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { sendAlertService } from './alerts/send_alert.service';
import { environment } from 'src/environments/environment';
import { IntervalsComponent } from './intervals/intervals.component';
import { ProcessesComponent } from './processes/processes.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    UploadComponent,
    NotificationsComponent,
    ProjectDetailsComponent,
    ProjectsMenuComponent,
    AddScheduleComponent,
    PopUpDialogComponent,
    AlertsComponent,
    IntervalsComponent,
    ProcessesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [sendAlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
