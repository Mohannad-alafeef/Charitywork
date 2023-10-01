import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Const } from '../shared/Const';
import { BehaviorSubject } from 'rxjs';
import { data } from 'jquery';
import { AnyObject } from 'src/assets/AdminAssets/vendor/chart.js/types/basic';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  period: string = 'Year';
  filterd: any[] = [];
  dtOptions: DataTables.Settings | AnyObject = {
    destroy: true,
    pagingType: 'full_numbers',
    search: true,
    columns: [
      {
        title: 'Charity Name',
        data: 'charity',
        searchable: true,
        render: (data: any) => {
          return data.charityName;
        },
      },
      {
        title: 'Charity Image',
        data: 'charity',
        searchable: false,
        render: (data: any) => {
          return `<img src="../../../assets/Images/${data.imagePath}" width="50" height="50" style="object-fit: cover;">`;
        },
      },
      {
        title: 'User Image',
        data: 'user',
        searchable: false,
        render: (data: any) => {
          return `<img src="../../../assets/Images/${data.imagePath}" width="50" height="50" style="object-fit: cover;">`;
        },
      },
      {
        title: 'User Name',
        data: 'user',
        searchable: true,
        render: (data: any) => {
          return data.firstName + ' ' + data.lastName;
        },
      },
      {
        title: 'Amount',
        data: 'amount',
        searchable: false,
      },
    ],
    pageLength: 50,
    lengthMenu: [10, 25, 50, 100],
    dom: 'Bfrtip',
    buttons: [
      {
        extend: 'pdfHtml5',
        text: 'Export as pdf',
        title: `Webiste Benefits For The Last ${this.period}`,

        filename: () => {
          return new Date().toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
          });
        },
        exportOptions: {
          columns: [3, 0, 4],
        },
        orientation: 'landscape',
        customize: (doc: Window | any) => {
          console.log(doc.content[2]);

          doc.content[2].table.widths = ['*', '*', '*'];
          doc.styles.tableBodyOdd.alignment = 'center';
          doc.styles.tableBodyEven.alignment = 'center';
        },
        messageTop: () => {
          return `Number Of Payments : ${
            this.filterd.length
          }\r\rTotal Benefit : ${this.filterd
            .map((x) => x.amount)
            .reduce((sum, el) => (sum += el), 0)}\r`;
        },
      },
      {
        text: 'Period',
        extend: 'collection',
        autoClose: true,
        buttons: [
          {
            text: 'All',
            action: (e: any, dt: DataTables.Api) => {
              this.filterd = this.payments;
              dt.clear();
              dt.rows.add(this.payments).draw();
            },
          },
          {
            text: 'Last Year',
            action: (e: any, dt: DataTables.Api, node: any, config: any) => {
              let date = new Date();
              this.filterd = this.payments.filter((v, i) => {
                if (new Date(v.paymentDate) > new Date(date.getFullYear(), -11))
                  return true;

                return false;
              });
              dt.clear();
              dt.rows.add(this.filterd).draw();
              this.period = 'Year';
            },
          },
          {
            text: 'Last Month',
            action: (e: any, dt: DataTables.Api, node: any, config: any) => {
              let date = new Date();
              this.filterd = this.payments.filter((v, i) => {
                if (
                  new Date(v.paymentDate) >
                  new Date(date.getFullYear(), date.getMonth(), -29)
                )
                  return true;

                return false;
              });
              dt.clear();
              dt.rows.add(this.filterd).draw();
              this.period = 'Month';
            },
          },
        ],
      },
    ],
  };
  constructor(private http: HttpClient) {
    this.getReports();
  }
  payments: any[] = [];
  paymentsObservable = new BehaviorSubject<any[]>([]);
  getReports() {
    this.http
      .get(`https://localhost:7081/api/payment/getBytype/${Const.Payment}`)
      .subscribe({
        next: (res: any) => {
          this.payments = res;
          this.filterd = res;
          this.dtOptions.data = this.payments;
          this.paymentsObservable.next(this.payments);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
