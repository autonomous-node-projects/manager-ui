import { Component, OnInit } from '@angular/core';
import { SendHTTPrequest, RequestConfig} from '../../common/api/wrapper';
import { Project } from '../../common/interfaces/project.interface';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})

export class ProjectsComponent implements OnInit {
  projectsArray: Array<Project> = []
  displayUploadModal: boolean = false

  constructor() { }

  getProjectsArray = async() => {
    const requestConfig: RequestConfig = {
      method: 'GET',
      endpoint: 'projects/'
    }
    const result = await SendHTTPrequest(requestConfig)
    if(result.status === 200){
      this.projectsArray = result.data.data
    }
  }

  ngOnInit(): void {
    setTimeout(()=>{
      this.getProjectsArray()
    }, 700)
  }

}
