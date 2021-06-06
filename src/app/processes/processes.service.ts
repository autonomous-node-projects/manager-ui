import { Injectable } from '@angular/core';
import { Process } from 'src/common/interfaces/process.interface';

@Injectable({
  providedIn: 'root',
})

export class ProcessesService {
  processes: Process[] = [];

  add(alert: Process) {
    this.processes.push(alert);
  }

  remove(processId: string){
    this.processes = this.processes.filter((process: Process)=> process.id !== processId)
  }

  clear() {
    this.processes = [];
  }
}
