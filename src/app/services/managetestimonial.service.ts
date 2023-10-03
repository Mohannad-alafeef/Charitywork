import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ManagetestimonialService {
  user :any={} ;
  testimonialObj:any=[{

  }]
  testimonials:any=[{'user':{}}];
  constructor(private http:HttpClient,route : Router,public toaster:ToastrService)
   {
  /*   const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    } */

   }
   getAllTestimonial(){
    this.http.get('https://localhost:7081/api/testimonial').subscribe({
      next: (res: any) => {
        this.testimonials=res;
      },
      error: (error) => {
        console.error('Error fetching testimonial data:', error);
      }
    });
}

UpdateTestimonial(body:any){
    this.http.put('https://localhost:7081/api/testimonial',body).subscribe({
      next: (res: any) => {
      this.toaster.success("updated Sucessfully");
        
      },
      error: (error) => {
        console.error('Error fetching testimonial data:', error);
      }
    });
}
getUserTestimonial(userId:any) {
    this.http.get('https://localhost:7081/api/testimonial').subscribe({
      next: (res: any) => {
        console.log(res);
        this.testimonialObj = res.filter((x:any)=>x.userId==userId);
        console.log(this.testimonialObj);
      },
      error: (error) => {
        console.error('Error fetching testimonial data:', error);
      }
    });
  }
DeleteTestimonial(id:number){
this.http.delete('https://localhost:7081/api/Testimonial/'+id).subscribe((res:any)=>{
  alert('Deleted Testimonial!');
},err=>{
  console.log(err);
})
}
createtTestimonial(body:any)
{
  this.http.post('https://localhost:7081/api/Testimonial',body).subscribe((res)=>
  {
    alert('Your Testimonial Added Sucessfully');
    
    window.location.reload();
  },err=>{
    alert('Something went wrong !');
  })
 
}
}
