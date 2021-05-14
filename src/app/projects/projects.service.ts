import { Injectable } from '@angular/core';
import { Project } from 'src/common/interfaces/project.interface';

@Injectable({
  providedIn: 'root',
})

export class ProjectsService {
  projects: Project[] = [];

  add(project: Project) {
    this.projects.push(project);
  }

  remove(projectId: string){
    this.projects = this.projects.filter((project: Project)=> project._id !== projectId)
  }

  clear() {
    this.projects = [];
  }
}
