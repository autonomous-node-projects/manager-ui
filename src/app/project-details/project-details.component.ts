import { Component, Input, Output } from '@angular/core';
import { async } from '@angular/core/testing';
import { SendHTTPrequest } from 'src/common/api/wrapper';
import { RequestConfig } from 'src/common/interfaces/request.interface';
import { Schedule } from 'src/common/interfaces/schedule.interface';
import { NotificationsSharedService } from '../notifications/notifications.sharedService';


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent {

  constructor(
    private notifications: NotificationsSharedService,
  ) { }

  @Input() selectedProject: any;

  tableHeaders = [
    {title: "Position", shortcut: "Pos."},
    {title: "Script Name", shortcut: "Script"},
    {title: "ID of schedule", shortcut: "ID"},
    {title: "Schedule time", shortcut: "Schedule"},
    {title: "Actions", shortcut: "Actions"},
  ]

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

  deleteSchedule = async(ScheduleId: string) => {
    const requestConfig: RequestConfig = {
      endpoint: `schedules/?id=${ScheduleId}`,
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

}
