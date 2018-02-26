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
      backgroundColor: 'rgba(148,159,177,0.2)',
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
    const result = this.stackGenerator.generateStacksWithConfig(config);
    const maxDps = this.stackGenerator.getCurrentMaxDps();
    console.log('My msxDps is ' + maxDps);
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
