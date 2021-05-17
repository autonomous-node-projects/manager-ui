import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { RequestConfig, SendHTTPrequest } from 'src/common/api/wrapper';
import { NotificationsSharedService } from '../notifications/notifications.sharedService';
import { timeValuesArray } from '../../common/interfaces/schedule.interface'

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss']
})

export class AddScheduleComponent {
  scheduleForm: FormGroup;
  timeValuesArray = timeValuesArray
  currentStep: number = 0;
  submitted = false;
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


  constructor(
    public fb: FormBuilder,
    private notifications: NotificationsSharedService,
  ) {
    this.scheduleForm = this.fb.group({
      scriptName: new FormControl('',Validators.required),
      every: new FormGroup({
        value: new FormControl(1, Validators.min(1)),
        timeType: new FormControl('', Validators.required)
      }),
      exitAfter: new FormControl('')
    });
  }

  displayModal: boolean = false;
  @Input() selectedProject: any;
  @Output() updateSchedules = new EventEmitter();

  closeModal(){
    this.displayModal = false
    this.currentStep = 0
    this.scheduleForm.reset()
  }

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

    const requestConfig: RequestConfig = {
      endpoint: `schedules/?id=${this.selectedProject._id}`,
      method: "POST",
      data: [schedule],
      headers: {'Content-Type': 'application/json'}
    }

    const response = await SendHTTPrequest(requestConfig)
    if (response.status >= 200 && response.status < 300){
      this.scheduleForm.reset()
      this.currentStep = 0;
      this.notifications.sendOpenNotificationEvent({
        message: `${response.statusText} - ${response.data.details}`,
         type: 'SUCCESS'
      });
      this.updateSchedules.emit(response.data.data[response.data.data.length-1])
      this.displayModal = false;
    } else {
      this.notifications.sendOpenNotificationEvent({
        message: `${response.status}: ${response.statusText} - Couldnt add schedule`,
         type: 'ERROR'
      });
    }
  }
}
