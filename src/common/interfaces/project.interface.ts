import { Schedule } from './schedule.interface';

export interface Project {
  _id: string;
  name: string;
  dataDirectory?: string;
  scripts?: object;
  schedules?: [Schedule];
  __v?: number;
}
