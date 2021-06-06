import { Component, OnInit } from '@angular/core';

import { SendHTTPrequest } from 'src/common/api/wrapper';
import { Interval } from 'src/common/interfaces/interval.interface';
import { RequestConfig } from 'src/common/interfaces/request.interface';
import { NotificationsSharedService } from '../notifications/notifications.sharedService';
import { IntervalsService } from './intervals.service';

@Component({
  selector: 'app-intervals',
  templateUrl: './intervals.component.html',
  styleUrls: ['./intervals.component.scss']
})
export class IntervalsComponent implements OnInit {
  tableHeaders = [
    {title: "Position", shortcut: "Pos."},
    {title: "Script Name", shortcut: "Script"},
    {title: "Project Name", shortcut: "Project"},
    {title: "ID of interval", shortcut: "ID"},
    {title: "Schedule time", shortcut: "Schedule"},
    {title: "Actions", shortcut: "Actions"},
  ]

  constructor(
    private notifications: NotificationsSharedService,
    public IntervalsService:IntervalsService
    ) { }

  deleteIntervals = async (ids: string[]) => {
    const requestConfig: RequestConfig = {
      method: 'DELETE',
      endpoint: `intervals?id=` + ids.map((id => {return id + "&" })),
      headers: {'Content-Type': 'application/json'}
    };
    const response = await SendHTTPrequest(requestConfig);

    // let tryToGetProjects = null;
    if (response.status === 200){
      ids.forEach((id)=>{
        this.IntervalsService.remove(id);
      })
      this.notifications.sendOpenNotificationEvent({
        message: `${response.statusText} - ${response.data.details}`,
         type: 'SUCCESS'
      });
    } else {
      this.notifications.sendOpenNotificationEvent({
        message: `${response.status}: ${response.statusText} - Couldnt delete intervals`,
         type: 'ERROR'
      });
    }
  }

  getIntervals = async () => {
    const requestConfig: RequestConfig = {
      method: 'GET',
      endpoint: `intervals`,
      headers: {'Content-Type': 'application/json'}
    };
    const response = await SendHTTPrequest(requestConfig);

    if (response.status === 200){
      // Smooth add to array
      response.data.data.forEach((element: Interval, index: number) => {
        // Check if object is already in array
        const projectIndex = this.IntervalsService.intervals.findIndex(inArrElement => inArrElement.id === element.id)

        // If not -> add it
        if (projectIndex === -1){
          // Add with delay for smooth transition
          setTimeout(() => {
            this.IntervalsService.add(element)
            }, 180 * index);
          }
      });
    }
  }

  ngOnInit(): void {
    this.getIntervals()
  }

}
