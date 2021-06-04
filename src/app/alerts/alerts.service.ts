import { Injectable } from '@angular/core';
import { Alert } from 'src/common/interfaces/alert.interface';

@Injectable({
  providedIn: 'root',
})

export class AlertsService {
  alerts: Alert[] = [];

  add(alert: Alert) {
    alert.alertCreationDate = new Date(alert.alertCreationDate).toLocaleString();
    this.alerts.push(alert);
  }

  remove(alertId: string){
    this.alerts = this.alerts.filter((alert: Alert)=> alert._id !== alertId)
  }

  clear() {
    this.alerts = [];
  }
}
