export interface Schedule {
  scriptName: string,
  every: {
    value: number,
    timeType: string
  }
 exitAfter?: number
}
