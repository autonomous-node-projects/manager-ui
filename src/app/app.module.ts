import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { UploadComponent } from './upload/upload.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectsMenuComponent } from './projects-menu/projects-menu.component';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    UploadComponent,
    NotificationsComponent,
    ProjectDetailsComponent,
    ProjectsMenuComponent,
    AddScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
