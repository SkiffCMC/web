import { TestBed, inject } from '@angular/core/testing';

import { StackGeneratorService } from './stack-generator.service';
import { MultipleStacksService } from './multiple-stacks.service';
import { StackGeneratorConfig } from './stackgeneratorconfig';

describe('StackGeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MultipleStacksService,StackGeneratorService]
    });
  });

  it('should be created', inject([StackGeneratorService], (service: StackGeneratorService) => {
    expect(service).toBeTruthy();
  }));
  it('creates stacks correctly', inject([StackGeneratorService], (service: StackGeneratorService) => {
    let conf = new StackGeneratorConfig().setParameters(100,1,true,true,0,4,6);
    let result = service.generateStacksWithConfig(conf);
    expect(result.length).toEqual(10);
    expect(result[0].getDps()).toEqual(100);
    expect(result[0].getDuration()).toEqual(1);
    expect(result[1].getDps()).toEqual(202);
    expect(result[1].getDuration()).toEqual(1);
    expect(result[5].getDuration()).toBeCloseTo(0.2);
    expect(result[5].getDps()).toBeCloseTo(526);
    conf = new StackGeneratorConfig().setParameters(100,1,false,false,0.15,4,10);
    result = service.generateStacksWithConfig(conf);
    expect(result.length).toEqual(19);
    expect(result[result.length-1].getEndTime()).toBeCloseTo(13.6);
  }));
});
