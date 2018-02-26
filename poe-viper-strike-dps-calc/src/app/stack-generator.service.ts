import { MultipleStacksService } from './multiple-stacks.service';
import { SingleStack } from './single-stack';
import { StackGeneratorConfig } from './stackgeneratorconfig';
import { Injectable } from '@angular/core';

@Injectable()
export class StackGeneratorService {
  private conf = new StackGeneratorConfig();
  constructor(private multipleStacks: MultipleStacksService) {

  }
  public generateStacks(): Array<SingleStack> {
    let i: number;
    let currentDuration: number;
    let currentDps: number;
    let currentTime = 0;
    for (i = 0; i < this.conf.durationInSeconds * this.conf.aps; i++) {
      currentDuration = this.conf.stackDurationInSeconds *
        (1 + this.conf.durationModifier +
        (this.conf.hasNoxiousStrike ? (this.conf.baseNSBonus * this.multipleStacks.getRecentStacksCount(
        this.conf.recently, currentTime)) : 0));
      currentDps = this.conf.dps *
        (1 + (this.conf.hasGrowingAgony ? (this.conf.baseGABonus * this.multipleStacks.getActiveStacksCount(currentTime)) : 0));
      this.multipleStacks.addStack(new SingleStack(currentDps, currentTime, currentDuration));
      currentTime += 1 / this.conf.aps;
    }
      const result = this.multipleStacks.getDpsIntervals();
      this.multipleStacks.reset();
      return result;
  }
  public generateStacksWithConfig(conf: StackGeneratorConfig): Array<SingleStack> {
    this.conf = conf;
    return this.generateStacks();
  }
  public getCurrentMaxDps(): number {
    return this.multipleStacks.getCurrentMaxDps();
  }
}
