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
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    responsive: false
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
    this.lineChartData[0].data = result.map((val) => val.getDps());
    this.lineChartData[0].label = 'Poison DPS';
    this.lineChartLabels = result.map((val) => val.getStartTime().toLocaleString() + '-' + val.getEndTime().toLocaleString());
  }

  ngOnInit() {
  }

}
