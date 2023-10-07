import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Const } from '../shared/Const';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http:HttpClient) { }

  sendPdfMail(to:string,charity:string,amount:string,payType:number) {
    let body: string ;
    if(payType==Const.Payment)
     body = 'Thank you for using our website.\rYour charity has been posted'
  else
      body = 'Thank you for using our website.\rThank You for Donation'

   this.http.get('../../../assets/pdf/pdfTemplate.html',{ responseType: 'blob' }).subscribe({
    next:(temp:any)=>{
      this.http.get('../../../assets/pdf/pdfStyle.css',{responseType:'blob'}).subscribe({
        next:(sty:any)=>{
          const formData = new FormData();
          formData.append('reciverEmail',to);
          formData.append('subject','Payment Receipt');
          formData.append('body','Check the pdf for More information about your payment');
          formData.append('pTitle','Payment Receipt');
          formData.append('pBody',body);
          formData.append('pCharity',charity);
      
          formData.append('pTemplate',temp);
          formData.append('pStyle',sty);
          formData.append('pAmount',amount);
            
            this.http
              .post('https://localhost:7081/api/email/sendWithPdf',formData)
              .subscribe({
                next: () => {
                  console.log('Email Sent');
                },
                error: (err) => {
                  console.log(err);
                },
              });
        }
      })
      
   
      
    }
   })
  }
}
