import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './alerts/alerts.component';
import { IntervalsComponent } from './intervals/intervals.component';
import { ProcessesComponent } from './processes/processes.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  {path: '', redirectTo: 'projects', pathMatch: 'full'},
  {path: 'projects', component: ProjectsComponent},
  {path: 'alerts', component: AlertsComponent},
  {path: 'intervals', component: IntervalsComponent},
  {path: 'processes', component: ProcessesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
