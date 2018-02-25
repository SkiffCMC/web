import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DpsChartComponent } from './dps-chart.component';
import { StackGeneratorService } from '../stack-generator.service';
import { MultipleStacksService } from '../multiple-stacks.service';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';

describe('DpsChartComponent', () => {
  let component: DpsChartComponent;
  let fixture: ComponentFixture<DpsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ChartsModule ],
      declarations: [ DpsChartComponent ],
      providers: [MultipleStacksService,StackGeneratorService]
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
