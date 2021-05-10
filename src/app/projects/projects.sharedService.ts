import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProjectsSharedService {
  private subject = new Subject<any>();

  sendPullProjectsEvent() {
    this.subject.next();
  }

  getPullProjectsEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}
