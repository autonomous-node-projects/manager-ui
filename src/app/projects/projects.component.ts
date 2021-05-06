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
    console.log(result)
    if(result.status === 200){
      // Smooth add to array
      result.data.data.forEach((element: Project, index:number)=>{
        // Check if object is already in array
        if(!this.projectsArray.find(inArrElement => inArrElement._id===element._id)){
          setTimeout(()=>{
            this.projectsArray.push(element)
            }, 250*index)
        }
      })
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
