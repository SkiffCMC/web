import { TestBed, inject } from '@angular/core/testing';

import { MultipleStacksService } from './multiple-stacks.service';
import { SingleStack } from './single-stack';

describe('MultipleStacksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MultipleStacksService]
    });
  });

  it('should be created', inject([MultipleStacksService], (service: MultipleStacksService) => {
    expect(service).toBeTruthy();
  }));
  
  it('starts with empty array', inject([MultipleStacksService], (service: MultipleStacksService) => {
    expect(service.getStacksCount()).toEqual(0);
    expect(service.getDpsAtSecond(3)).toEqual(0);
  }));
  
   it('adds stacks correctly', inject([MultipleStacksService], (service: MultipleStacksService) => {
    service.addStack(new SingleStack(100,1,4));
    service.addStack(new SingleStack(100,2,8));
    expect(service.getStacksCount()).toEqual(2);
  }));
  
   it('counts DPS correctly', inject([MultipleStacksService], (service: MultipleStacksService) => {
    service.addStack(new SingleStack(100,1,4));
    service.addStack(new SingleStack(150,2,8));
    expect(service.getDpsAtSecond(3)).toEqual(250);
    expect(service.getDpsAtSecond(1.5)).toEqual(100);
    expect(service.getDpsAtSecond(5)).toEqual(150);
  }));
  
   it('integrates stacks correctly', inject([MultipleStacksService], (service: MultipleStacksService) => {
    service.addStack(new SingleStack(100,0,4));
    service.addStack(new SingleStack(150,2,8));
    service.addStack(new SingleStack(200,12,4));
    let result: Array<SingleStack> = service.getDpsIntervals();
    expect(result.length).toEqual(5);
    expect(result[0].getStartTime()).toEqual(0);
    expect(result[0].getEndTime()).toEqual(2);
    expect(result[0].getDps()).toEqual(100);
    expect(result[1].getStartTime()).toEqual(2);
    expect(result[1].getEndTime()).toEqual(4);
    expect(result[1].getDps()).toEqual(250);
    expect(result[2].getStartTime()).toEqual(4);
    expect(result[2].getEndTime()).toEqual(10);
    expect(result[2].getDps()).toEqual(150);
    expect(result[3].getStartTime()).toEqual(10);
    expect(result[3].getEndTime()).toEqual(12);
    expect(result[3].getDps()).toEqual(0);
    expect(result[4].getStartTime()).toEqual(12);
    expect(result[4].getEndTime()).toEqual(16);
    expect(result[4].getDps()).toEqual(200);
  }));
  
   it('counts recent and active stacks correctly', inject([MultipleStacksService], (service: MultipleStacksService) => {
    service.addStack(new SingleStack(100,0,4));
    service.addStack(new SingleStack(150,2,8));
    service.addStack(new SingleStack(200,12,4));
    expect(service.getRecentStacksCount(4,1)).toEqual(1);
    expect(service.getRecentStacksCount(4,3)).toEqual(2);
    expect(service.getRecentStacksCount(4,7)).toEqual(0);
    expect(service.getRecentStacksCount(4,12.1)).toEqual(1);
    expect(service.getActiveStacksCount(1)).toEqual(1);
    expect(service.getActiveStacksCount(3)).toEqual(2);
    expect(service.getActiveStacksCount(7)).toEqual(1);
    expect(service.getActiveStacksCount(12.1)).toEqual(1);
  }));
  
  it('counts recent and active stacks correctly', inject([MultipleStacksService], (service: MultipleStacksService) => {
    service.addStack(new SingleStack(100,0,2));
    service.addStack(new SingleStack(160,2,2));
    service.addStack(new SingleStack(130,4,2));
    const intervals = new Array<SingleStack>();
    intervals.push(new SingleStack(1,0,3));
    intervals.push(new SingleStack(1,3,3));
    const result = service.getIntegratedStacks(intervals);
    expect(result.length).toEqual(2);
    expect(result[0].getDps()).toEqual(120);
    expect(result[1].getDps()).toEqual(140);
  }));

   it('resets correctly', inject([MultipleStacksService], (service: MultipleStacksService) => {
    service.addStack(new SingleStack(100,1,4));
    service.addStack(new SingleStack(100,2,8));
    service.reset();
    expect(service.getStacksCount()).toEqual(0);
    expect(service.getDpsAtSecond(3)).toEqual(0);
  }));
});
