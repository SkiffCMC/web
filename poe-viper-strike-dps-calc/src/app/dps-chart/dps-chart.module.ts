import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { DpsChartComponent } from './dps-chart.component';

@NgModule({
  imports: [
    CommonModule, ChartsModule
  ],
  declarations: [DpsChartComponent],
  exports: [DpsChartComponent]
})
export class DpsChartModule { }
