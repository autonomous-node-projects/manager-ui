import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SendHTTPrequest } from 'src/common/api/wrapper';
import { NotificationsSharedService } from '../notifications/notifications.sharedService';
import { ProjectsSharedService } from '../projects/projects.sharedService';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})

export class UploadComponent {
  uploadForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private notifications: NotificationsSharedService,
    private getProjects: ProjectsSharedService
  ) {
    this.uploadForm = this.fb.group({
      archive: new FormControl(null, Validators.required),
      dataDirectory: new FormControl('')
    });
  }

  @Input() displayModal = false;

  filename = '';
  submitted = false;


  uploadFile(event: any) {
    if (event.target !== null){
      const input = event.target as HTMLInputElement;
      if (input.files){
        const file = input.files[0];
        this.filename = file.name;
        this.uploadForm.patchValue({
          archive: file
        });
      }
      try {
        const archiveUpdate = this.uploadForm.get('archive');
        if (archiveUpdate !== null){
          archiveUpdate.updateValueAndValidity();
        }
      } catch (error) {

      }
    }
  }

  onSubmit = async () => {
    this.submitted = true;
    const formData: any = new FormData();

    Object.keys(this.uploadForm.value).forEach(element => {
      const field = this.uploadForm.get(String(element));
      if (field){
        formData.append(String(element), field.value);
      }
    });

    const response = await SendHTTPrequest({
      endpoint: 'projects',
      method: 'POST',
      data: formData
    });

    if (response.status >= 200 && response.status < 300){
        this.notifications.sendOpenNotificationEvent({
          message: `${response.statusText} - ${response.data.details}: ${response.data.data}`,
           type: 'SUCCESS'
        });
        this.getProjects.sendPullProjectsEvent();
      }
    if (response.status >= 300 && response.status < 400){
        this.notifications.sendOpenNotificationEvent({
          message: `${response.statusText} - ${response.data.details}`,
          type: 'ERROR'
        });
        this.getProjects.sendPullProjectsEvent();
      }
    if (response.status >= 500){
        this.notifications.sendOpenNotificationEvent({
          message: `${response.status} - ${response.statusText} - Cant upload data to server`,
          type: 'ERROR'
        });
      }

    this.uploadForm.reset();
    this.filename = '';
    this.displayModal = false;

    setTimeout(() => {
      this.submitted = false;
    }, 200);
  }

}
