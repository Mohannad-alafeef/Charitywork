import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Const } from '../shared/Const';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  homeObj:any={};
  aboutObj:any={};
  contactObj:any={};
  testObj:any={};
  userTestObj:any=[];
  charityObj:any=[];
  charityRecentObj:any=[];
  paymentsObj:any=[];
  constructor(private http: HttpClient) {}

  getAboutPage() {
     this.http.get('https://localhost:7081/api/aboutPage/1').subscribe({
      next:(res)=>{
        this.aboutObj = res
      }
    });
  }
  getHomePage() {
     this.http.get('https://localhost:7081/api/HomePage/1').subscribe({
      next:(res)=>{
        this.homeObj = res
      }
    });

  }
  getContactPage() {
     this.http.get('https://localhost:7081/api/ContactPage/1').subscribe({
      next:(res)=>{
        this.contactObj = res
      }
    });
  }
  getCharities() {
     this.http.get('https://localhost:7081/api/charity').subscribe({
      next:(res:any)=>{
        this.charityObj = res
        this.charityRecentObj = res.slice(0,3)
      }
    });
  }
  getUserTest() {
     this.http.get('https://localhost:7081/api/testimonial').subscribe({
      next:(res:any)=>{
        this.userTestObj = res
        
      }
    });
  }
  getTest() {
     this.http.get('https://localhost:7081/api/testimonialpage/1').subscribe({
      next:(res:any)=>{
        this.testObj = res
        
      }
    });
  }
  sendMessage(body:any) {
     this.http.post('https://localhost:7081/api/Contact',body).subscribe({
      next:(res:any)=>{

      }
    });
  }
  getPayments() {
     this.http.get(`https://localhost:7081/api/payment/getBytype/${Const.Donation}`).subscribe({
      next:(res:any)=>{
        this.paymentsObj = res.slice(0,4)
        
      }
    });
  }
}