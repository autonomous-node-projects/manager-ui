import { Component, OnInit } from '@angular/core';
import { Project } from '../../common/interfaces/project.interface';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  project: Project = {
    _id: 'id of project',
    name: 'Project name',
    dataDirectory: 'data/out',
    scripts: {
      'start': 'node src/index.js'
    },
    schedules: [{
      scriptName: 'start',
      every: {
        value: 4,
        timeType: 'hours'
      }
    }],
    __v: 0
  }

  constructor() { }

  ngOnInit(): void {
  }

}
