const timeDict = {
  hour: 'hour',
  hours: 'hours',
  minute: 'minute',
  minutes: 'minutes'
};

export const timeValuesArray = Object.keys(timeDict);

export type timeValues = keyof typeof timeDict;


export interface Schedule {
  _id?: string,
  scriptName: string;
  every: {
    value: number,
    timeType: timeValues
  };
 exitAfter?: number;
}
