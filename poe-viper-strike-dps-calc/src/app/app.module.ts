import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DpsChartModule } from './dps-chart/dps-chart.module';

import { StackGeneratorService } from './stack-generator.service';
import { MultipleStacksService } from './multiple-stacks.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, DpsChartModule
  ],
  providers: [ MultipleStacksService, StackGeneratorService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
