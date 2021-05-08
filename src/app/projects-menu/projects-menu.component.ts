import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../../common/interfaces/project.interface';

@Component({
  selector: 'app-projects-menu',
  templateUrl: './projects-menu.component.html',
  styleUrls: ['./projects-menu.component.scss']
})


export class ProjectsMenuComponent implements OnInit {

  constructor() { }

  @Input() projectsArray: Array<Project> = [];
  @Input() errorLoadingProjectsArray: boolean = false;
  @Output("selectProjectId") public selectProjectId = new EventEmitter<string>();

  selectedId: string = ''


  selectProjectIdlocal (id: string) {
    this.selectedId = id
    this.selectProjectId.emit(id)
  }

  ngOnInit(): void {
  }

}
