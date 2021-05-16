import { Component, OnInit } from '@angular/core';
import { SendHTTPrequest, RequestConfig} from '../../common/api/wrapper';
import { Project } from '../../common/interfaces/project.interface';
import { NotificationsSharedService } from '../notifications/notifications.sharedService';
import { ProjectsSharedService } from './projects.sharedService';
import { ProjectsService } from './projects.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})

export class ProjectsComponent implements OnInit {
  selectProjectEventSubscription: Subscription;
  errorLoadingProjectsArray = false;
  selectedProject?: Project | null;

  constructor(
    private route: ActivatedRoute,
    private notifications: NotificationsSharedService,
    private projectsSharedService: ProjectsSharedService,
    public projectsService: ProjectsService,
  ) {
    this.selectProjectEventSubscription = this.projectsSharedService.getSelectProjectEvent().subscribe((projectId) => {
      this.selectProjectId(projectId);
    });
  }

  selectProjectId = async(projectId: string | null) =>{
    if(projectId){
      const requestConfig: RequestConfig = {
        method: 'GET',
        endpoint: `projects?id=${projectId}`,
        headers: {'Content-Type': 'application/json'}
      };
      const result = await SendHTTPrequest(requestConfig)
      if(result.status === 200){
        const project: Project = result.data.data
        this.selectedProject = project
      }
    } else {
      this.selectedProject = null
    }
  }

  getProjectsArray = async () => {
    const requestConfig: RequestConfig = {
      method: 'GET',
      endpoint: 'projects?names_only=true',
      headers: {'Content-Type': 'application/json'}
    };
    const response = await SendHTTPrequest(requestConfig);

    // let tryToGetProjects = null;

    if (response.status === 200){
      // if(tryToGetProjects){
      //   clearInterval(tryToGetProjects)
      // }
      // Smooth add to array
      response.data.data.forEach((element: Project, index: number) => {
        // Check if object is already in array
        const projectIndex = this.projectsService.projects.findIndex(inArrElement => inArrElement._id === element._id)

        // If not -> add it
        if (projectIndex === -1){
          // Add with delay for smooth transition
          setTimeout(() => {
            this.projectsService.add(element)
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
      // if(!tryToGetProjects){
      //   tryToGetProjects = setInterval(() => {
      //     this.getProjectsArray();
      //     if(this.selectedProject){
      //       this.selectProjectId(this.selectedProject._id)
      //     }
      //   }, 1000 * 5);
      // }
    }
  }

  ngOnInit(): void {
    this.getProjectsArray();

    this.route.queryParams
      .subscribe(params => {
        this.selectProjectId(params.id)
      }
    );
  }
}
