import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProjectsService } from '../projects/projects.service';
import { ProjectsSharedService } from '../projects/projects.sharedService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects-menu',
  templateUrl: './projects-menu.component.html',
  styleUrls: ['./projects-menu.component.scss']
})


export class ProjectsMenuComponent {
  selectProjectEventSubscription: Subscription;
  selectedId = '';

  constructor(
    private projectsSharedService: ProjectsSharedService,
    public projectsService: ProjectsService
  ) {
    this.selectProjectEventSubscription = this.projectsSharedService.getSelectProjectEvent().subscribe((projectId) => {
      this.selectedId = projectId
    });
  }

  @Input() errorLoadingProjectsArray = false;
  @Output() public selectProjectId = new EventEmitter<string>();

  selectProjectIdlocal(id: string) {
    this.selectedId = id;
    this.selectProjectId.emit(id);
  }

}
