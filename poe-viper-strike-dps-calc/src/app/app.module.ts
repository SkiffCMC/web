import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DpsChartModule } from './dps-chart/dps-chart.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, DpsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
