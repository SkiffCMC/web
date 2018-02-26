import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DpsChartComponent } from './dps-chart/dps-chart.component'
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { StackGeneratorService } from './stack-generator.service';
import { MultipleStacksService } from './multiple-stacks.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ChartsModule ],
      declarations: [
        AppComponent,DpsChartComponent
      ],
      providers: [ MultipleStacksService,StackGeneratorService ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'POE Viper Strike poison DPS calculator'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('POE Viper Strike poison DPS calculator');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to SkiffCMC\'s POE Viper Strike poison DPS calculator!');
  }));
});
