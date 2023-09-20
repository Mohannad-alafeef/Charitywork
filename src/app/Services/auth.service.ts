import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http :HttpClient,private toastr :ToastrService) { }

  loginId :any;
   CreateLogin(body: any)  {
     //debugger

    this.http.post('https://localhost:7081/api/login/createLogin',body).subscribe((resp: any) =>
    {
      this.loginId=resp.loginId;
      //alert(' Success');
      this.toastr.success('Success'); 
    }, err => {
      //alert('somthing wrong');
      console.log(err.status);
      this.toastr.error('Error', err.status); 
    })
   //window.location.reload();
   return true;
  }

  CreateAccount(body: any) {
   // debugger
   body.loginId=this.loginId;
    this.http.post('https://localhost:7081/api/Account',body).subscribe((resp: any) =>
    {

     // console.log(resp);
      //alert(' Success');
      this.toastr.success('Success'); 
    }, err => {
     // alert('somthing wrong');
      console.log(err.status);
      this.toastr.error('Error', err.status); 
    })
    
    //window.location.reload();
  }

}
