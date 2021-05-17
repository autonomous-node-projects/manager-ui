import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { RequestConfig, SendHTTPrequest } from 'src/common/api/wrapper';
import { NotificationsSharedService } from '../notifications/notifications.sharedService';
import { ProjectsService } from '../projects/projects.service';
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
    private projectsService: ProjectsService,
    private projectsSharedService: ProjectsSharedService
  ) {
    this.uploadForm = this.fb.group({
      archive: new FormControl(null, Validators.required),
      dataDirectory: new FormControl('')
    });
  }

  displayModal = false;
  filename = '';
  submitted = false;

  closeModal(){
    this.displayModal = false;
    this.filename = '';
    this.uploadForm.reset();
  }

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
    var formDataObject: any = new FormData();

    Object.keys(this.uploadForm.value).forEach(element => {
      const field = this.uploadForm.get(String(element));
      if (field){
          formDataObject.append(String(element), field.value)
      }
    });

    for (var [key, value] of formDataObject.entries()) {
      console.log(key, value);
    }

    const requestConfig: RequestConfig = {
      endpoint: 'projects',
      method: 'POST',
      data: formDataObject
    }

    const response = await SendHTTPrequest(requestConfig);
    console.log(response.data)
    if (response.status >= 200 && response.status < 300){
        this.notifications.sendOpenNotificationEvent({
          message: `${response.statusText} - ${response.data.details}: ${response.data.data}`,
          type: 'SUCCESS'
        });
        this.projectsService.add(response.data.data)
        this.projectsSharedService.sendSelectProjectEvent(response.data.data._id)
      }
    if (response.status >= 300 && response.status < 500){
        this.notifications.sendOpenNotificationEvent({
          message: `${response.statusText} - ${response.data.details}`,
          type: 'ERROR'
        });
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
