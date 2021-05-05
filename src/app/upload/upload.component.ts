import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SendHTTPrequest } from 'src/common/api/wrapper';
import { SharedService } from '../notifications/sharedService';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})

export class UploadComponent implements OnInit {
  uploadForm: FormGroup

  constructor(
    public fb: FormBuilder,
    private sharedService:SharedService
  ) {
    this.uploadForm = this.fb.group({
      archive: new FormControl(null, Validators.required),
      dataDirectory: new FormControl('')
    });
  }

  @Input() displayModal: boolean = false;

  filename: string = '';
  submitted: boolean = false;


  uploadFile(event: any) {
    if(event.target !== null){
      const input = event.target as HTMLInputElement;
      if(input.files){
        const file = input.files[0]
        this.filename = file.name
        this.uploadForm.patchValue({
          archive: file
        });
      }
      try {
        var archiveUpdate = this.uploadForm.get('archive');
        if(archiveUpdate !== null){
          archiveUpdate.updateValueAndValidity();
        }
      } catch (error) {

      }
    }
  }

  onSubmit = async() => {
    this.submitted = true;
    var formData: any = new FormData()

    Object.keys(this.uploadForm.value).forEach(element => {
      const field = this.uploadForm.get(String(element));
      if(field){
        formData.append(String(element), field.value)
      }
    });

    const response = await SendHTTPrequest({
      endpoint: 'projects',
      method: 'POST',
      data: formData
    })

    let errorOccurred = false
      if (response.status > 200){
        this.sharedService.sendOpenNotificationEvent({
          message: `${response.statusText} - ${response.data.details}: ${response.data.data}`,
           type: 'SUCCESS'
        });
      }
      if (response.status > 400){
        this.sharedService.sendOpenNotificationEvent({
          message: `${response.statusText} - ${response.data.details}`,
          type: 'ERROR'
        });
      }

    this.uploadForm.reset()
    this.filename = ''
    this.displayModal = false

    setTimeout(()=>{
      this.submitted = false;
    }, 200)
  }

  ngOnInit(): void {
  }

}
