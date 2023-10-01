import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserwalletService {
  user :any={} ;
 walletlObj:any=[{

  }]
  constructor(private http:HttpClient,route : Router,public toaster:ToastrService)
  {
   const userString = localStorage.getItem('user');
   if (userString) {
     this.user = JSON.parse(userString);
   }

  }
  
  getUserWallet() {
    this.http.get('https://localhost:7081/api/visaCard').subscribe({
      next: (res: any) => {
        console.log(res);
        this.walletlObj = res.filter((x:any)=>x.userId==this.user.userId);
        console.log(this.walletlObj);
      },
      error: (error) => {
        console.error('Error fetching testimonial data:', error);
      }
    });
  }
  DeleteWallet(id:number){
    this.http.delete('https://localhost:7081/api/visaCard/'+id).subscribe((res:any)=>{
      alert(' Wallet Deleted !');
    },err=>{
      console.log(err);
    })
    }

    createtWallet(body:any)
    {
      this.http.post('https://localhost:7081/api/visaCard',body).subscribe((res)=>
      {
        alert('Your Wallet Created Sucessfully');
        
    
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
