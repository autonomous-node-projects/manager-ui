import { Component, OnInit } from '@angular/core';
import { SendHTTPrequest, RequestConfig} from '../../common/api/wrapper';
import { Project } from '../../common/interfaces/project.interface';
import { NotificationsSharedService } from '../notifications/notifications.sharedService';
import { ProjectsSharedService } from './projects.sharedService';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})

export class ProjectsComponent implements OnInit {
  clickEventsubscription: Subscription;
  errorLoadingProjectsArray = false;
  projectsArray: Array<Project> = [];
  selectedProject?: Project;
  displayUploadModal = false;

  constructor(
    private notifications: NotificationsSharedService,
    private getProjects: ProjectsSharedService
  ) { this.clickEventsubscription = this.getProjects.getPullProjectsEvent().subscribe(() => {
    this.getProjectsArray();
});}

  selectProjectId(id: string){
    this.selectedProject = this.projectsArray.find((project) => project._id === id);
  }


  getProjectsArray = async () => {
    const requestConfig: RequestConfig = {
      method: 'GET',
      endpoint: 'projects/'
    };
    const response = await SendHTTPrequest(requestConfig);

    if (response.status === 200){
      // Smooth add to array
      response.data.data.forEach((element: Project, index: number) => {
        // Check if object is already in array
        if (!this.projectsArray.find(inArrElement => inArrElement._id === element._id)){
          // Add with delay for smooth transition
          setTimeout(() => {
            this.projectsArray.push(element);
            }, 250 * index);
        }
      });
    } else {
      this.errorLoadingProjectsArray = true;
      if (response.status >= 500){
        this.notifications.sendOpenNotificationEvent({
          message: `${response.status}: ${response.statusText} - Couldnt get projects from API `,
           type: 'ERROR'
        });
      }
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getProjectsArray();
    }, 700);

    setInterval(() => {
      this.getProjectsArray();
    }, 1000 * 60);
  }
}
