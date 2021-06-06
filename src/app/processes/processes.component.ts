import { Component, OnInit } from '@angular/core';

import { SendHTTPrequest } from 'src/common/api/wrapper';
import { Process } from 'src/common/interfaces/process.interface';
import { RequestConfig } from 'src/common/interfaces/request.interface';
import { NotificationsSharedService } from '../notifications/notifications.sharedService';
import { ProcessesService } from './processes.service';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss']
})
export class ProcessesComponent implements OnInit {
  tableHeaders = [
    {title: "Position", shortcut: "Pos."},
    {title: "Script Name", shortcut: "Script"},
    {title: "Project Name", shortcut: "Project"},
    {title: "ID of process", shortcut: "ID"},
    {title: "Actions", shortcut: "Actions"},
  ]
  constructor(
    private notifications: NotificationsSharedService,
    public ProcessesService: ProcessesService
    ) { }

  deleteProcesses = async (ids: string[]) => {
    const requestConfig: RequestConfig = {
      method: 'DELETE',
      endpoint: `processes?id=` + ids.map((id => {return id + "&" })),
      headers: {'Content-Type': 'application/json'}
    };
    const response = await SendHTTPrequest(requestConfig);

    if (response.status === 200){
      ids.forEach((id)=>{
        this.ProcessesService.remove(id);
      })
      this.notifications.sendOpenNotificationEvent({
        message: `${response.statusText} - ${response.data.details}`,
         type: 'SUCCESS'
      });
    } else {
      this.notifications.sendOpenNotificationEvent({
        message: `${response.status}: ${response.statusText} - Couldnt delete processes`,
         type: 'ERROR'
      });
    }
  }

  getProcesses = async () => {
    const requestConfig: RequestConfig = {
      method: 'GET',
      endpoint: `processes`,
      headers: {'Content-Type': 'application/json'}
    };
    const response = await SendHTTPrequest(requestConfig);

    if (response.status === 200){
      // Smooth add to array
      response.data.data.forEach((element: Process, index: number) => {
        // Check if object is already in array
        const projectIndex = this.ProcessesService.processes.findIndex(inArrElement => inArrElement.id === element.id)

        // If not -> add it
        if (projectIndex === -1){
          // Add with delay for smooth transition
          setTimeout(() => {
            this.ProcessesService.add(element)
            }, 180 * index);
          }
      });
    }
  }

  ngOnInit(): void {
    this.getProcesses()
  }

}
