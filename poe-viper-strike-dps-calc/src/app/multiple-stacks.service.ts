import { Injectable } from '@angular/core';
import { SingleStack } from './single-stack';

@Injectable()
export class MultipleStacksService {
  stacks: Array<SingleStack>;
  constructor() {
    this.stacks = new Array<SingleStack>();
  }
  public addStack(stack: SingleStack) {
    this.stacks.push(stack);
  }
  public getStacksCount(): number {
    return this.stacks.length;
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
  public getDpsIntervals(): Array<SingleStack> {
    const keySeconds: Array<number> = new Array<number>();
    const pseudoStacks: Array<SingleStack> = new Array<SingleStack>();
    this.stacks.forEach(val => {
      keySeconds.push(val.getStartTime());
      keySeconds.push(val.getEndTime());
    });
    keySeconds.sort((n1, n2) => n1 - n2);
    let i: number;
    for (i = 0; i < keySeconds.length - 1; i++) {
      if (keySeconds[i] !== keySeconds[i + 1]) {
        pseudoStacks.push(
          new SingleStack(this.getDpsAtSecond((keySeconds[i] + keySeconds[i + 1]) / 2), keySeconds[i], keySeconds[i + 1] - keySeconds[i])
        );
      }
    }
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
