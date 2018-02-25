export class SingleStack {
  private dps: number;
  private startTime: number;
  private duration: number;
  constructor(dps?: number, startTime?: number, duration?: number) {
    if (dps || dps === 0) {
      this.dps = dps;
    }
    if (duration) {
      this.duration = duration;
    }
    if (startTime || startTime === 0) {
      this.startTime = startTime;
    }
  }
  public isDefined(): boolean {
    if ((this.dps || this.dps === 0) && this.duration && (this.startTime || this.startTime === 0)) {
      return true;
    }
    return false;
  }
  public getEndTime(): number {
    return this.startTime + this.duration;
  }
  public getStartTime(): number {
    return this.startTime;
  }
  public getDps(): number {
    return this.dps;
  }
  public getDuration(): number {
    return this.duration;
  }
  public setDps(dps: number) {
    this.dps = dps;
  }
}
