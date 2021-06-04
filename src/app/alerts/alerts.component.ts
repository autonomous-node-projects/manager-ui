import { Component, OnInit } from '@angular/core';
import { SendHTTPrequest } from 'src/common/api/wrapper';
import { Alert } from 'src/common/interfaces/alert.interface';
import { RequestConfig } from 'src/common/interfaces/request.interface';
import { AlertsService } from './alerts.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  alertsOffset = 0;
  constructor(
    public alertsService: AlertsService,
  ) { }

  getMoreAlerts = async () => {
    const requestConfig: RequestConfig = {
      method: 'GET',
      endpoint: `alerts?limit=10&offset=${this.alertsOffset}`,
      headers: {'Content-Type': 'application/json'}
    };
    const response = await SendHTTPrequest(requestConfig);

    // let tryToGetProjects = null;
    if (response.status === 200){
      // Smooth add to array
      response.data.data.forEach((element: Alert, index: number) => {
        // Check if object is already in array
        const projectIndex = this.alertsService.alerts.findIndex(inArrElement => inArrElement._id === element._id)

        // If not -> add it
        if (projectIndex === -1){
          // Add with delay for smooth transition
          setTimeout(() => {
            this.alertsService.add(element)
            }, 250 * index);
          }
      });
      this.alertsOffset += 10;
    }
  }

  ngOnInit(): void {
    this.getMoreAlerts();

  }

}
