import { SingleStack } from './single-stack';
describe("SingleStack",()=>{
  let singleStack: SingleStack;
  beforeEach(()=>{
    singleStack = new SingleStack(100,2.5,3.5);
  });
  afterEach(()=>{
    singleStack = null;
  });
  it("Should return a value",()=>{
    expect(singleStack.getDps()).toEqual(100);
  });
  it("Should return correct end time",()=>{
    expect(singleStack.getEndTime()).toEqual(6);
  });
});