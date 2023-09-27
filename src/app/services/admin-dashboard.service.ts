import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Const } from '../shared/Const';
import { Subject } from 'rxjs';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root',
})
export class AdminDashboardService {
  users: Array<any> = [];
  categories: Array<any> = [];
  charities: any[] = [];
  recentCharities: any[] = [];
  donations: Array<any> = [];
  payments: Array<any> = [];
  testimonials: Array<any> = [];
  messages: Array<any> = [];
  issues: Array<any> = [];
  dtOptions: DataTables.Settings = {
    destroy:true,
    pagingType:'full_numbers',
    search:true,
    columns: [{
      title: 'Charity Name',
      data: 'charityName',
      searchable:true
    },{
      title:'Charity Image',
      data:'imagePath',
      searchable:false,
      render:(data)=>{
        return `<img src="../../../assets/Images/${data}" width="50" height="50" style="object-fit: cover;">`
      }
    }, {
      title: 'Donation Goal',
      data: 'donationGoal',
      searchable:false
      
    },
    {
      title:'Donation',
      data:'payments',
      searchable:false,
      render:(data:any[])=>{
        return data.map((x:any)=>{
          if(x==null) return {amount:0};
          else return x;
        }).reduce((sum,el)=>sum+= el.amount,0);
        
      }
    }],
    pageLength: 5,
    lengthMenu:[5,10,15]
    
  };
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private http: HttpClient) {}

  getUsers() {
    this.http.get('https://localhost:7081/api/Account').subscribe({
      next: (resp: any) => {
        this.users = resp;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getCategories() {
    this.http
      .get('https://localhost:7081/api/Category/GetAllCategory')
      .subscribe({
        next: (resp: any) => {
          this.categories = resp;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  getCharities() {
    
    this.http.get('https://localhost:7081/api/charity').subscribe({
      next: (resp: any) => {
        this.charities = resp;
        this.recentCharities = this.charities.slice(0,15);
        console.log("charities : " + this.charities.filter(x=>x.isAccepted == Const.Accepted));
        this.dtOptions.data = this.recentCharities;
        this.dtTrigger.next(this.dtOptions);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getPayments() {
    this.http.get('https://localhost:7081/api/Payment').subscribe({
      next: (resp: any) => {
        this.payments = resp.filter((x: any) => x.paymentType == Const.Payment);
        this.donations = resp.filter(
          (x: any) => x.paymentType == Const.Donation
        );
        

        
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getTestimonail() {
    this.http.get('https://localhost:7081/api/testimonial').subscribe({
      next: (resp: any) => {
        this.testimonials = resp;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getContact() {
    this.http.get('https://localhost:7081/api/Contact').subscribe({
      next: (resp: any) => {
        this.messages = resp;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getIssues() {
    this.http.get('https://localhost:7081/api/IssuesReport/getAllissues').subscribe({
      next: (resp: any) => {
        this.issues = resp;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  
  init() {
    this.getPayments();
    this.getUsers();
    this.getCategories();
    this.getCharities();
    this.getTestimonail();
    this.getContact();
    this.getIssues();
  }
}
