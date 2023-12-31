import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserwalletService {
  user :any={} ;
 walletlObj:any=[{

  }]
  constructor(private http:HttpClient,route : Router,public toaster:ToastrService, public spin:NgxSpinnerService)
  {

  }
  
  getUserWallet(userId:any) {
    this.spin.show();

    this.http.get('https://localhost:7081/api/visaCard').subscribe({
      next: (res: any) => {
        console.log(res);
        this.walletlObj = res.filter((x:any)=>x.userId==userId);
        console.log(this.walletlObj);
        this.spin.hide();

      },

      error: (error) => {
        console.error('Error fetching testimonial data:', error);
      }
    });
  }
  DeleteWallet(id:number){
  
    this.spin.show();
    this.http.delete('https://localhost:7081/api/visaCard/'+id).subscribe((res:any)=>{
      //alert(' Wallet Deleted !');
      this.spin.hide();
      this.toaster.success('Deleted', 'success', {
        timeOut: 3000,
      }).onHidden.subscribe({
        next:()=>{
          window.location.reload();
        }
      });
    },err=>{
      console.log(err);
    })
    }

  createtWallet(body:any)
    {
       this.spin.show();

      this.http.post('https://localhost:7081/api/visaCard',body).subscribe((res)=>
      {
       // alert('Your Wallet Created Sucessfully');
       this.spin.hide();
       this.toaster.success('VisaCard Added Successfully', 'success', {
        timeOut: 2500,
      }).onHidden.subscribe({
        next:()=>{
          window.location.reload();

        }
      });
      },err=>{
        alert('Something went wrong !');
      })
    }
  //   ChargeWallet(body:any){
  //     this.http.put('https://localhost:7081/api/visaCard',body).subscribe({
  //       next: (res: any) => {
  //       this.toaster.success("Charged Sucessfully");
          
  //       },
  //       error: (error) => {
  //         console.error('Error fetching Wallet data:', error);
  //       }
  //     });
  // }

}
