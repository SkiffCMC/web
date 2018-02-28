import { SingleStack } from '../single-stack';
import { StackGeneratorService } from '../stack-generator.service';
import { StackGeneratorConfig } from '../stackgeneratorconfig';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dps-chart',
  templateUrl: './dps-chart.component.html',
  styleUrls: ['./dps-chart.component.css']
})
export class DpsChartComponent implements OnInit {

  public localConfig = new StackGeneratorConfig();
  private numberOfBars = 25;
  constructor(private stackGenerator: StackGeneratorService) {
    this.update();
  }
  // lineChart
  public lineChartData: Array<any> = [
    {data: [], label: ''}
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: false,
    scales : { yAxes: [{ ticks: { beginAtZero : true, stepValue : 10, max : 100 } }] }
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(48,209,77,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'bar';

  public update(conf?: StackGeneratorConfig) {
    const config = conf ? conf : this.localConfig;
    const intervals = new Array<SingleStack>();
    const step = this.localConfig.durationInSeconds * this.localConfig.aps < this.numberOfBars ? 1 / this.localConfig.aps : this.localConfig.durationInSeconds / this.numberOfBars;
    for (let i = 0; (i < this.numberOfBars) && (i < this.localConfig.durationInSeconds * this.localConfig.aps); i++) {
      intervals.push(new SingleStack(1, i * step, step));
    }
    const result = this.stackGenerator.generateStacksWithConfig(config, intervals);
    // this.stacksCount = result.length;
    // this.endTime = result[result.length - 1].getEndTime();
    const maxDps = this.stackGenerator.getCurrentMaxDps();
    // this.textConfig = '';
    this.lineChartData[0].data = result.map((val) => val.getDps());
    this.lineChartData[0].label = 'Poison DPS';
    this.lineChartLabels = result.map((val) => val.getStartTime().toLocaleString() + '-' + val.getEndTime().toLocaleString());
    this.lineChartOptions.scales.yAxes[0].ticks.max = maxDps;
  }

  ngOnInit() {
  }

  public onChange(parameter?: any): void {
    this.update();
  }
}
