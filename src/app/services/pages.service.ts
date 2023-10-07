import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  homeObj:any={};
  aboutObj:any={};
  contactObj:any={};
  testimonialObj:any={};

  user :any={} ;
  display_image:any;




  constructor(private http:HttpClient,route : Router,private spinner :NgxSpinnerService,private toastr: ToastrService) 
  { 
  }

// get home page
  getHomePage(){
    this.http.get('https://localhost:7081/api/HomePage/1').subscribe({
        next: (resp: any) => {
          console.log(resp);
          this.homeObj = resp;
        },
        error: (err) => {
          console.log(err);
        },
      });
   }
  //  get about page 
   getAboutPage(){
    this.http.get('https://localhost:7081/api/aboutPage/1').subscribe({
        next: (resp: any) => {
          console.log(resp);
          this.aboutObj = resp;
        },
        error: (err) => {
          console.log(err);
        },
      });
   }
  //  get contact page 
  getcontactPage(){
    this.http.get('https://localhost:7081/api/ContactPage/1').subscribe({
        next: (resp: any) => {
          console.log(resp);
          this.contactObj = resp;
        },
        error: (err) => {
          console.log(err);
        },
      });
   }

 //  get contact page 
 gettestimonialPage(){
  this.http.get('https://localhost:7081/api/testimonialpage/1').subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.testimonialObj = resp;
      },
      error: (err) => {
        console.log(err);
      },
    });
 }
//-----------------------------------------  Update pages ----------------------------------------------------------------------------------------------
// home page update

   UpdateHomePage(body:any){
    if(this.display_image!=null)
    body.imagePath=this.display_image;
     
    this.spinner.show();
    this.http.put('https://localhost:7081/api/HomePage/Update',body).subscribe((resp: any) =>
    {
      this.spinner.hide();
      this.toastr.success('Success'); 
    },err=>
    {
     // this.toastr.error('Error', err.status); 
    })
  }

  //about us page update 
  UpdateaboutPage(body:any){
    if(this.display_image!=null)
     body.imagePath=this.display_image;
      
    this.spinner.show();
    this.http.put('https://localhost:7081/api/aboutPage/update',body).subscribe((resp: any) =>
    {
      this.spinner.hide();
      this.toastr.success('Success'); 
    },err=>
    {
      //this.toastr.error('Error', err.status); 
    })
  }
  //contact us page update 
  UpdatecontactPage(body:any){
    this.spinner.show();
    this.http.put('https://localhost:7081/api/ContactPage/update',body).subscribe((resp: any) =>
    {
      this.spinner.hide();
      this.toastr.success('Success'); 
    },err=>
    {
      //this.toastr.error('Error', err.status); 
    })
  }
  //testimonial  page update 
  UpdatetestimonialPage(body:any){
    if(this.display_image!=null)
    body.imagePath=this.display_image;
   
   
    this.spinner.show();
    this.http.put('https://localhost:7081/api/testimonialpage/update',body).subscribe((resp: any) =>
    {
      this.spinner.hide();
      this.toastr.success('Success'); 
    },err=>
    {
      //this.toastr.error('Error', err.status); 
    })
  }

//-------------------------------------------------------------Upload Images ---------------------------------------

  UploadhomeAttachment(file: FormData) {
    this.http.post('https://localhost:7081/api/HomePage/uploadImage',file).subscribe((resp:any)=>{
      this.display_image= resp.imagePath; 
      console.log(resp);

    },err=>{
      //alert('somthing wrong');
      this.toastr.error('Error', err.status); 
    });
    }
    UploadaboutAttachment(file: FormData) {
      this.http.post('https://localhost:7081/api/aboutPage/uploadImage',file).subscribe((resp:any)=>{
        this.display_image= resp.imagePath; 
        console.log(resp);
     
      },err=>{
        //alert('somthing wrong');
        this.toastr.error('Error', err.status); 
      });
      }
      UploadtestimonialAttachment(file: FormData) {
        this.http.post('https://localhost:7081/api/testimonialpage/UploadImage',file).subscribe((resp:any)=>{
      this.display_image= resp.imagePath; 
      console.log(resp);
     
    },err=>{
      //alert('somthing wrong');
     // this.toastr.error('Error', err.status); 
    });
    }
 }
      
