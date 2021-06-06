import { timeValues } from "./schedule.interface";


export interface Interval {
  id: string;
  projectName: string;
  scriptName: string;
  every: {
    time: number;
    timeType: timeValues;
  }
}
