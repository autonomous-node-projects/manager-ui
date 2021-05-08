import { Component, OnInit } from '@angular/core';
import { NotificationsType, NotificationParameters } from './notifications.interface';
import { NotificationsSharedService } from './notifications.sharedService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})



export class NotificationsComponent implements OnInit {
  clickEventsubscription: Subscription
    constructor(
    private notifications:NotificationsSharedService,
    ) {
      this.clickEventsubscription = this.notifications.getOpenNotificationEvent().subscribe((params)=>{
        this.runNotification(params)
    })
    }

  displayNotification: boolean = false
  notificationType: NotificationsType = 'SUCCESS'
  notificationMessage: string = ''

  closeNotification(){
    this.displayNotification = false
  }

  runNotification(params: NotificationParameters){
    this.notificationMessage = params.message
    this.notificationType = params.type
    this.displayNotification = true


    setTimeout(()=>{
      this.displayNotification = false
    }, !params.timeout ? 5000 : params.timeout)
  }

  ngOnInit(): void {
  }

}
