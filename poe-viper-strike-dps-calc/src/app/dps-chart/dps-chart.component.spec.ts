import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DpsChartComponent } from './dps-chart.component';

describe('DpsChartComponent', () => {
  let component: DpsChartComponent;
  let fixture: ComponentFixture<DpsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DpsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DpsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
