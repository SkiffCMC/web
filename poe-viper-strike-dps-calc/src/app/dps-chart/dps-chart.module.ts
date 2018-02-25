import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { FormsModule } from '@angular/forms';

import { DpsChartComponent } from './dps-chart.component';

@NgModule({
  imports: [
    CommonModule, FormsModule, ChartsModule
  ],
  declarations: [DpsChartComponent],
  exports: [DpsChartComponent]
})
export class DpsChartModule { }
