import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { RequestConfig, SendHTTPrequest } from 'src/common/api/wrapper';
import { NotificationsSharedService } from '../notifications/notifications.sharedService';
import { timeValuesArray } from '../../common/interfaces/schedule.interface'
import { ProjectsSharedService } from '../projects/projects.sharedService';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss']
})
export class AddScheduleComponent {
  scheduleForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private notifications: NotificationsSharedService,
    private getProjects: ProjectsSharedService
  ) {
    this.scheduleForm = this.fb.group({
      scriptName: new FormControl(Validators.required),
      every: new FormGroup({
        value: new FormControl(Validators.min(0), Validators.max(60)),
        timeType: new FormControl(Validators.required)
      }),
      exitAfter: new FormControl()
    });
  }

  @Input() displayModal = false;
  @Input() selectedProject: any;
  @Output() getProjectsArray = new EventEmitter();

  timeValuesArray = timeValuesArray
  currentStep: number = 0;

  steps: Array<any> = [
  {
    title: "Script",
    icon: "ph-app-window"
  },{
    title: "Time",
    icon: "ph-hourglass"
  },{
    title: "Confirm",
    icon: "ph-checks"
  }
]

  submitted = false;

  onSubmit = async () => {
    let schedule: any = {}
    Object.keys(this.scheduleForm.value).forEach(element => {
      const field = this.scheduleForm.get(String(element));
      if (field){
        if(field.value !== null){
          schedule[String(element)] = field.value
        }
      }
    });

    console.log(schedule)
    const requestConfig: RequestConfig = {
      endpoint: `schedules/?id=${this.selectedProject._id}`,
      method: "POST",
      data: [schedule]
    }
    console.log(requestConfig)
    const response = await SendHTTPrequest(requestConfig)
    if (response.status >= 200 && response.status < 300){
      this.notifications.sendOpenNotificationEvent({
        message: `${response.statusText} - ${response.data.details}: ${response.data.data}`,
         type: 'SUCCESS'
      });
      this.getProjects.sendPullProjectsEvent()
      this.displayModal = false;
    }
    console.log(response)
  }

}
