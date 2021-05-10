import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../../common/interfaces/project.interface';

@Component({
  selector: 'app-projects-menu',
  templateUrl: './projects-menu.component.html',
  styleUrls: ['./projects-menu.component.scss']
})


export class ProjectsMenuComponent {

  constructor() { }

  @Input() projectsArray: Array<Project> = [];
  @Input() errorLoadingProjectsArray = false;
  @Output() public selectProjectId = new EventEmitter<string>();

  selectedId = '';


  selectProjectIdlocal(id: string) {
    this.selectedId = id;
    this.selectProjectId.emit(id);
  }


}
