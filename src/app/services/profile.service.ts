import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  display_image:any;
  constructor(private http :HttpClient,private spinner :NgxSpinnerService,private toastr: ToastrService) { }

    
  UploadAttachment(file: FormData) {
    
    this.http.post('https://localhost:7081/api/Account/UploadImage',file).subscribe((resp:any)=>{
      this.display_image= resp.imagePath; 
      console.log(resp);
      this.toastr.success('Success'); 
    },err=>{
      this.toastr.error('Error', err.status); 
    });
    }


    UpdateAccount(body:any){
      body.imagePath=this.display_image;
      this.spinner.show();
      this.http.put('https://localhost:7081/api/Account/UpdateAccount',body).subscribe((resp: any) =>
      {
        this.spinner.hide();
        this.toastr.success('Success'); 
      },err=>
      {
        this.toastr.error('Error', err.status); 
      })
    }

    UpdateLogin(body:any){
      debugger
  
      this.spinner.show();
      this.http.put('https://localhost:7081/api/login/updatelogin',body).subscribe((resp: any) =>
      {
        this.spinner.hide();
        this.toastr.success('Success'); 
      },err=>
      {
        this.spinner.hide();
        this.toastr.error('Error', err.status); 
      })
    }
  
}
