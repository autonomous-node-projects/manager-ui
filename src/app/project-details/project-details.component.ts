import { Component, OnInit, Input } from '@angular/core';
import { SendHTTPrequest } from 'src/common/api/wrapper';
import { RequestConfig } from 'src/common/interfaces/request.interface';
import { NotificationsSharedService } from '../notifications/notifications.sharedService';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  constructor(
    private notifications:NotificationsSharedService
  ) { }

  @Input() selectedProject: any;

  SaveFile = (href: string, filename: string) => {
    const a = document.createElement('a');
    a.href = href;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(href)
}

  downloadData = async() => {
    const requestConfig: RequestConfig = {
      method: 'GET',
      endpoint: `output?id=${this.selectedProject._id}&type=download`
    }
    const response = await SendHTTPrequest(requestConfig)

    if(response.status === 200){
      this.SaveFile(response.data, `ANPM_${this.selectedProject.name}-output.tar`)
    } else {
      this.notifications.sendOpenNotificationEvent({
        message: `${response.status}: ${response.statusText} - Couldnt download output data `,
         type: 'ERROR'
      });
    }
  }

  ngOnInit(): void {
  }

}
