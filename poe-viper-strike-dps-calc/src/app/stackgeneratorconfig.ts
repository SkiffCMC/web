export class StackGeneratorConfig {
  dps = 100;
  aps = 1;
  baseNSBonus = 0.05;
  baseGABonus = 0.02;
  recently = 4;
  hasNoxiousStrike = false;
  hasGrowingAgony = false;
  durationModifier = 0;
  stackDurationInSeconds = 4;
  durationInSeconds = 10;
  public setParameters(dps?: number, aps?: number, hasNoxiousStrike?: boolean,
    hasGrowingAgony?: boolean, durationModifier?: number, stackDurationInSeconds?: number,
    durationInSeconds?: number): StackGeneratorConfig {
    if (dps) {
      this.dps = dps;
    }
    if (aps) {
      this.aps = aps;
    }
    if (hasNoxiousStrike || (hasNoxiousStrike === false)) {
      this.hasNoxiousStrike = hasNoxiousStrike;
    }
    if (hasGrowingAgony || (hasGrowingAgony === false)) {
      this.hasGrowingAgony = hasGrowingAgony;
    }
    if (durationModifier) {
      this.durationModifier = durationModifier;
    }
    if (durationInSeconds) {
      this.durationInSeconds = durationInSeconds;
    }
    if (stackDurationInSeconds) {
      this.stackDurationInSeconds = stackDurationInSeconds;
    }
    return this;
  }
}
