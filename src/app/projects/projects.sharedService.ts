import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProjectsSharedService {
  private subject = new Subject<any>();

  sendSelectProjectEvent(projectId: string | null) {
    this.subject.next(projectId);
  }

  getSelectProjectEvent(): Observable<any> {
    return this.subject.asObservable();
  }
}
