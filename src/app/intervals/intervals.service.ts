import { Injectable } from '@angular/core';
import { Interval } from 'src/common/interfaces/interval.interface';

@Injectable({
  providedIn: 'root',
})

export class IntervalsService {
  intervals: Interval[] = [];

  add(alert: Interval) {
    this.intervals.push(alert);
  }

  remove(intervalId: string){
    this.intervals = this.intervals.filter((interval: Interval)=> interval.id !== intervalId)
  }

  clear() {
    this.intervals = [];
  }
}
