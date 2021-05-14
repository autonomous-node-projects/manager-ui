import { Component, Input } from '@angular/core';
import { SendHTTPrequest } from 'src/common/api/wrapper';
import { RequestConfig } from 'src/common/interfaces/request.interface';
import { Schedule } from 'src/common/interfaces/schedule.interface';
import { NotificationsSharedService } from '../notifications/notifications.sharedService';
import { popUpDialog } from '../pop-up-dialog/pop-up-dialog.interface';
import { ProjectsService } from '../projects/projects.service';
import { ProjectsSharedService } from '../projects/projects.sharedService';


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})

export class ProjectDetailsComponent {
  displayPopUp: boolean = false;
  popUpOptions: popUpDialog = {
    text: `Are you sure about deleting current project?`,
    critical: true,
    actions: {
      ok: "Confirm delete",
      cancel: "Cancel"
    }
  }

  tableHeaders = [
    {title: "Position", shortcut: "Pos."},
    {title: "Script Name", shortcut: "Script"},
    {title: "ID of schedule", shortcut: "ID"},
    {title: "Schedule time", shortcut: "Schedule"},
    {title: "Actions", shortcut: "Actions"},
  ]

  constructor(
    private notifications: NotificationsSharedService,
    private projectsService: ProjectsService,
    private projectsSharedService: ProjectsSharedService
  ) { }

  @Input() selectedProject: any;

  SaveFile = (href: string, filename: string) => {
    const a = document.createElement('a');
    a.href = href;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(href);
  }

  downloadData = async () => {
    const requestConfig: RequestConfig = {
      method: 'GET',
      endpoint: `output?id=${this.selectedProject._id}&type=download`
    };
    const response = await SendHTTPrequest(requestConfig);

    if (response.status === 200){
      this.SaveFile(response.data, `ANPM_${this.selectedProject.name}-output.tar`);
    } else {
      this.notifications.sendOpenNotificationEvent({
        message: `${response.status}: ${response.statusText} - Couldnt download output data `,
         type: 'ERROR'
      });
    }
  }

  updateSchedules = (schedule: object) => {
    this.selectedProject.schedules.push(schedule)
  }

  deleteSchedule = async(ScheduleId: string) => {
    const requestConfig: RequestConfig = {
      endpoint: `schedules?id=${ScheduleId}`,
      method: "DELETE"
    }
    const response = await SendHTTPrequest(requestConfig);
    if(response.status === 200){
      this.selectedProject.schedules = this.selectedProject.schedules.filter((schedule: Schedule)=>{return schedule._id !== ScheduleId})
      this.notifications.sendOpenNotificationEvent({
        message: `${response.status}: ${response.statusText} - Schedule with ID ${ScheduleId} correctly deleted`,
        type: "SUCCESS",
        timeout: 2000
      })
    }
  }

  deleteProject() {
    this.displayPopUp = true
  }

  popUpAction = async(result: boolean) =>{
    this.displayPopUp = false;
    if(result){
      const requestConfig: RequestConfig = {
        endpoint: `projects?id=${this.selectedProject._id}`,
        method: "DELETE"
      }
      const response = await SendHTTPrequest(requestConfig);
      if(response.status === 200){
        this.notifications.sendOpenNotificationEvent({
          message: `${response.status}: ${response.statusText} - Project with ID ${this.selectedProject._id} correctly deleted`,
          type: "SUCCESS",
          timeout: 2000
        })
        this.projectsService.remove(this.selectedProject._id)
        this.projectsSharedService.sendSelectProjectEvent(null)
      }
    }
  }
}
