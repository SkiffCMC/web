import { Injectable } from '@angular/core';
import { SingleStack } from './single-stack';

@Injectable()
export class MultipleStacksService {
  stacks: Array<SingleStack>;
  maxDps = 0;
  constructor() {
    this.stacks = new Array<SingleStack>();
  }
  public addStack(stack: SingleStack) {
    if (this.stacks.length === 0) {
      this.maxDps = 0;
    }
    this.stacks.push(stack);
    if (this.maxDps < stack.getDps()) {
      this.maxDps = stack.getDps();
    }
  }
  public getStacksCount(): number {
    return this.stacks.length;
  }
  public getCurrentMaxDps(): number {
    return this.maxDps;
  }
  public getDpsAtSecond(second: number): number {
    let totalDps: number;
    totalDps = 0;
    this.stacks.forEach(val => {
      if ((val.getStartTime() <= second) && (val.getEndTime() > second)) {
        totalDps += val.getDps();
      }
    });
    return totalDps;
  }
  private getStacksInInterval(startTime: number, endTime: number): Array<SingleStack> {
    const result = new Array<SingleStack>();
    this.stacks.forEach(val => {
      if ((val.getStartTime() >= startTime) && (val.getEndTime() <= endTime) ) {
        result.push(val);
      }
      if ((val.getStartTime() < startTime) && (val.getEndTime() > endTime) ) {
        result.push(new SingleStack(val.getDps(), startTime, endTime - startTime));
      }
      if ((val.getStartTime() < startTime) && (val.getEndTime() <= endTime)  && (val.getEndTime() > startTime)) {
        result.push(new SingleStack(val.getDps(), startTime, val.getEndTime() - startTime));
      }
      if ((val.getStartTime() >= startTime) && (val.getEndTime() > endTime) && (endTime > val.getStartTime())) {
        result.push(new SingleStack(val.getDps(), val.getStartTime(), endTime - val.getStartTime()));
      }
    });
    return result;
  }
  private integrateToSingleStack(stacks: Array<SingleStack>): SingleStack {
    if (stacks.length === 0) {
      return new SingleStack(0, 0, 0);
    }
    let resultDamage = 0;
    let resultDuration = 0;
    let resultStartTime = stacks[0].getStartTime();
    stacks.forEach(val => {
      if (resultStartTime > val.getStartTime()) {
        resultStartTime = val.getStartTime();
      }
      resultDamage += val.getTotalDamage();
      resultDuration += val.getDuration();
    });
    return new SingleStack(resultDamage / resultDuration, resultStartTime, resultDuration);
  }
  public getIntegratedStacks(intervals: Array<SingleStack>): Array<SingleStack> {
    const result = new Array<SingleStack>();
    intervals.forEach((val) =>  {
      result.push(this.integrateToSingleStack(this.getStacksInInterval(val.getStartTime(), val.getEndTime())));
    });
    return result;
  }
  public getDpsIntervals(): Array<SingleStack> {
    const keySeconds: Array<number> = new Array<number>();
    const pseudoStacks: Array<SingleStack> = new Array<SingleStack>();
    this.stacks.forEach(val => {
      keySeconds.push(val.getStartTime());
      keySeconds.push(val.getEndTime());
    });
    keySeconds.sort((n1, n2) => n1 - n2);
    let i: number;
    this.maxDps = 0;
    for (i = 0; i < keySeconds.length - 1; i++) {
      if (keySeconds[i] !== keySeconds[i + 1]) {
        if (this.maxDps < this.getDpsAtSecond((keySeconds[i] + keySeconds[i + 1]) / 2)) {
          this.maxDps = this.getDpsAtSecond((keySeconds[i] + keySeconds[i + 1]) / 2);
        }
        pseudoStacks.push(
          new SingleStack(this.getDpsAtSecond((keySeconds[i] + keySeconds[i + 1]) / 2), keySeconds[i], keySeconds[i + 1] - keySeconds[i])
        );
      }
    }
    this.stacks = pseudoStacks;
    return pseudoStacks;
  }
  public getRecentStacksCount(recently: number, currentTime: number): number {
    return this.stacks.filter((value) => (value.getStartTime() >= currentTime - recently) && (value.getStartTime() < currentTime)).length;
  }
  public getActiveStacksCount(currentTime: number): number {
    return this.stacks.filter((value) => (value.getStartTime() < currentTime ) && (value.getEndTime() > currentTime)).length;
  }
  public reset(): void {
    this.stacks = new Array<SingleStack>();
  }
}
