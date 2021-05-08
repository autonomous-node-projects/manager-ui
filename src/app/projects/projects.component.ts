import { Component, OnInit } from '@angular/core';
import { SendHTTPrequest, RequestConfig} from '../../common/api/wrapper';
import { Project } from '../../common/interfaces/project.interface';
import { NotificationsSharedService } from '../notifications/notifications.sharedService';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})

export class ProjectsComponent implements OnInit {
  errorLoadingProjectsArray: boolean = false
  projectsArray: Array<Project> = []
  selectedProject?: Project;
  displayUploadModal: boolean = false

  constructor(
    private notifications:NotificationsSharedService
  ) { }

  selectProjectId(id: string){
    this.selectedProject = this.projectsArray.find((project)=>{return project._id === id});
  }


  getProjectsArray = async() => {
    const requestConfig: RequestConfig = {
      method: 'GET',
      endpoint: 'projects/'
    }
    const response = await SendHTTPrequest(requestConfig)

    if(response.status === 200){
      // Smooth add to array
      response.data.data.forEach((element: Project, index:number)=>{
        // Check if object is already in array
        if(!this.projectsArray.find(inArrElement => inArrElement._id===element._id)){
          // Add with delay for smooth transition
          setTimeout(()=>{
            this.projectsArray.push(element)
            }, 250*index)
        }
      })
    } else {
      this.errorLoadingProjectsArray = true
      if(response.status>=500){
        this.notifications.sendOpenNotificationEvent({
          message: `${response.status}: ${response.statusText} - Couldnt get projects from API `,
           type: 'ERROR'
        });
      }
    }
  }

  ngOnInit(): void {
    setTimeout(()=>{
      this.getProjectsArray()
    }, 700)

    setInterval(()=>{
      this.getProjectsArray()
    }, 1000*60)
  }
}
