import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http:HttpClient) { }

  sendPdfMail(charity:string) {
    let body = 'Thank you for using our website.\rYour charity has been posted'
   this.http.get('../../../assets/pdf/pdfTemplate.html',{ responseType: 'blob' }).subscribe({
    next:(temp:any)=>{
      this.http.get('../../../assets/pdf/pdfStyle.css',{responseType:'blob'}).subscribe({
        next:(sty:any)=>{
          const formData = new FormData();
          formData.append('reciverEmail','mohannadafif1998@gmail.com');
          formData.append('subject','Greatings');
          formData.append('body','hello');
          formData.append('pTitle','Payment Receipt');
          formData.append('pBody',body);
          formData.append('pCharity',charity);
      
          formData.append('pTemplate',temp);
          formData.append('pStyle',sty);
            
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
