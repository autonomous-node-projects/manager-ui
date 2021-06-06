import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';

import { SendHTTPrequest } from 'src/common/api/wrapper';
import { Alert } from 'src/common/interfaces/alert.interface';
import { RequestConfig } from 'src/common/interfaces/request.interface';
import { environment } from 'src/environments/environment';
import { AlertsService } from './alerts.service';
import { sendAlertService } from './send_alert.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
  providers: [sendAlertService]
})

export class AlertsComponent implements OnInit {

  constructor(
    private swPush: SwPush,
    private sendAlertService: sendAlertService,
    public alertsService: AlertsService,
  ) { }

  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: environment.publicVapidKey
    })
    .then(sub => this.sendAlertService.addPushSubscriber(sub).subscribe())
    .catch(err => console.error("Could not subscribe to notifications", err));
  }

  alertsOffset = 0;
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
            }, 180 * index);
          }
      });
      this.alertsOffset += 10;
    }
  }

  ngOnInit(): void {
    this.getMoreAlerts();
  }

}
