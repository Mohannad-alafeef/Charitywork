import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexTooltip,
  ApexDataLabels,
  ApexTitleSubtitle,
  ChartComponent,
} from 'ngx-apexcharts';
import { Subject, Subscription } from 'rxjs';
import { AdminDashboardService } from 'src/app/services/admin-dashboard.service';
import { Const } from 'src/app/shared/Const';
declare function refresh2(): any;

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit,OnDestroy {
  public chartOptions: Partial<ChartOptions> | null = null;
  dtTrigger: Subject<any> = new Subject<any>();
  date = new Date();
  month = () =>
    Array.from(Array(12), (e, i) =>
      new Date(this.date.getFullYear(), i).toLocaleString()
    );
  day = () =>
    Array.from(Array(30), (e, i) =>
      new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        i
      ).toLocaleString()
    );
  hour = () =>
    Array.from(Array(24), (e, i) =>
      new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        this.date.getDate(),
        i
      ).toLocaleString()
    );

  months: string[] = [];
  days: string[] = [];
  hours: string[] = [];
  selectedDate: string[] = [];
  data1: any[] = [];
  data2: any[] = [];
  sub:Subscription|null = null;
  ngOnInit(): void {
    refresh2();
    this.sub = this.dashboard.charityObservable.subscribe({
      next:(res)=>{
        this.dtTrigger.next(this.dashboard.dtOptions);
      }
    })
  }
  constructor(public dashboard: AdminDashboardService) {
    dashboard.init();

    this.months = this.month();
    this.days = this.day();
    this.hours = this.hour();
    this.initChart();
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.dtTrigger.unsubscribe();
    
  }

  initChart() {
    this.chartOptions = {
      series: [
        {
          name: 'Payments',
          data: this.data1,
        },
        {
          name: 'Users',
          data: this.data2,
        },
      ],

      chart: {
        height: 350,
        type: 'area',
        id: 'statisticsChart',
        toolbar: {
          tools: {
            zoom: false,
            zoomin: false,
            zoomout: false,
            reset: false,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: this.days,
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
      title: {
        text: 'Statistics Chart | Month',
        align: 'left',
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: 'sans-serif',
          color: '#263238',
        },
      },
    };
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.updateMonthData();

      console.log('aview');
      console.log(this.chartOptions);
    }, 2000);
    this.dtTrigger.next(this.dashboard.dtOptions);
  }
  getRevenueBetweenDate(date1: string, date2: string): Array<any> {
    return this.dashboard.donations.filter((x: any) => new Date(x.paymentDate));
  }
  getTotalPayments(): number {
    return this.dashboard.payments
      .map((x) => x.amount)
      .reduce((sum, el) => (sum += el), 0);
  }
  getTotalDonation(): number {
    return this.dashboard.donations
      .map((x) => x.amount)
      .reduce((sum, el) => (sum += el), 0);
  }
  totalUsers(): number {
    return this.dashboard.users.length;
  }
  updateDayData() {
    this.getPeriodData(this.hours);
    this.chartOptions!.title = {
      text: 'Statistics Chart | Day',
      align: 'left',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        color: '#263238',
      },
    };
    this.chartOptions!.xaxis = {
      type: 'datetime',
      categories: this.hours,
    };
    this.chartOptions!.series = [
      {
        name: 'Payments',
        data: this.data1,
      },
      {
        name: 'Users',
        data: this.data2,
      },
    ];
  }

  updateMonthData() {
    this.getPeriodData(this.days);
    this.chartOptions!.title = {
      text: 'Statistics Chart | Month',
      align: 'left',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        color: '#263238',
      },
    };
    this.chartOptions!.xaxis = {
      type: 'datetime',
      categories: this.days,
    };
    this.chartOptions!.series = [
      {
        name: 'Payments',
        data: this.data1,
      },
      {
        name: 'Users',
        data: this.data2,
      },
    ];
  }

  updateYearData() {
    this.getPeriodData(this.months);
    this.chartOptions!.title = {
      text: 'Statistics Chart | Year',
      align: 'left',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        color: '#263238',
      },
    };
    this.chartOptions!.xaxis = {
      type: 'datetime',
      categories: this.months,
    };
    this.chartOptions!.series = [
      {
        name: 'Payments',
        data: this.data1,
      },
      {
        name: 'Users',
        data: this.data2,
      },
    ];
  }
  getPeriodData(period: string[]) {
    try {
      let sDate: string = period[0];
      let startDate = new Date(sDate);
      let eDate: string = period[period.length - 1];
      let endDate = new Date(eDate);

      
     
        const mappedPayments:{x:string,y:number}[] = [];
        const mappedUsers:{x:string,y:number}[] = [];
        for (let index = 0; index < period.length-1; index++) {
          const date1 = period[index];
          const date2 = period[index+1];
          const periodPayment = this.dashboard.payments.filter((v)=>new Date(v.paymentDate) >= new Date(date1) &&
          new Date(v.paymentDate) <= new Date(date2)).reduce((sum,el)=>sum+=el.amount,0);
          const periodUsers = this.dashboard.users.filter((v)=>new Date(v.loginDate) >= new Date(date1) &&
          new Date(v.loginDate) <= new Date(date2)).reduce((sum,el)=>sum+=1,0);
          mappedPayments.push({x:date1,y:periodPayment});
          mappedUsers.push({x:date1,y:periodUsers});
          
        }
      
      this.data1 = mappedPayments;
      this.data2 = mappedUsers;
    } catch (e: any) {
      console.log(e);
    }
  }
}
