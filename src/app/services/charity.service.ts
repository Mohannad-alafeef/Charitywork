import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Const } from '../shared/Const';

@Injectable({
  providedIn: 'root'
})
export class CharityService {

  constructor(private http:HttpClient , public spin:NgxSpinnerService,public toastr:ToastrService) {
  
   }
 
  charities:any =[{'user':{},'category':{}}];
  usercharities:any=[{}];
  goals:any=[{}];
  addGoal:any={}
  user:any={};
  display_image:any;
  charityId:any;
  Visa:any=[{}];
  
   getUserCharities(userId:any){
    debugger;
   
    this.spin.show();

     this.http.get('https://localhost:7081/api/Charity/getAll').subscribe((resp:any)=>{
     
      this.usercharities= resp.filter((ch:any)=>{return ch.user.userId==userId;})
      this.charities=resp;
      this.spin.hide();

     },err=>{
       console.log(err.status);
     })
   }
  getAllCharities(){
    debugger;
    this.spin.show();

    this.http.get('https://localhost:7081/api/Charity/getAll').subscribe((resp:any)=>{

    this.charities=resp;
    this.spin.hide();

     },err=>{
       console.log(err.status);
     })
   }

   DeleteCharity(id:number){
     // debugger;
      this.spin.show();
      this.http.delete('https://localhost:7081/api/charity/'+id).subscribe((resp:any)=>{
     
      this.spin.hide();
      this.toastr.success('Deleted', 'success', {
        timeOut: 3000,
      }).onHidden.subscribe({
        next:()=>{
          window.location.reload();
        }
      });
      },err=>{
      console.log(err.status);
      })
   }

   updateChrity(body:any){
      debugger;
      this.spin.show();
      this.http.put('https://localhost:7081/api/charity/Update',body).subscribe((resp)=>{
       
      this.spin.hide();
      this.toastr.success('Updated', 'success', {
        timeOut: 2000,
      }).onHidden.subscribe({
        next:()=>{
          window.location.reload();
        }
      });
    },err=>{
      console.log(err.status);
    })
   
   }
   
     updateChrityInfo(charity:any,goal:any){
     
    debugger;
    if(this.display_image!=null)
      charity.imagePath=this.display_image;
      this.spin.show();
     this.http.put('https://localhost:7081/api/charity/Update',charity).subscribe((resp)=>{
     for(var i=0;i<goal.length;i++)
    { 
      this.UpdateGoal(goal[i]);
    } 
  
    this.spin.hide();
    this.toastr.success('Updated', 'success', {
      timeOut: 3000,
    }).onHidden.subscribe({
      next:()=>{
      
        window.location.reload();
      }
    });
      },err=>{
        console.log(err.status);
      })
    }

  
    getGoals(id:number)
   {
        this.http.get('https://localhost:7081/api/Goal/charityGoals/'+id).subscribe((resp:any)=>{
        this.goals=resp;
      },err=>{
      console.log(err);
      })
   }

   CreateCharity(body: any,charityGoals:any) {
    // debugger
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    }
    body.userId=this.user.userId;
    body.imagePath=this.display_image;

    console.log(body);
    this.spin.show();
    this.http.post('https://localhost:7081/api/charity/create',body).subscribe((resp: any) =>
    {
      this.charityId=resp;
      this.addGoal.charityId=resp;
  
      this.addGoal.goalText=charityGoals.goal1;
      console.log(this.addGoal);
      debugger
      this.CreateGoal(this.addGoal);
      
      this.addGoal.goalText=charityGoals.goal2;
      console.log(this.addGoal);
      debugger
      this.CreateGoal(this.addGoal);
      debugger
      if(charityGoals.goal3!='')
      {
        this.addGoal.goalText=charityGoals.goal3;
        console.log(this.addGoal);
        debugger
        this.CreateGoal(this.addGoal);
      }
      this.spin.hide();
     
      this.toastr.success('Charity was Sent successfuly to the admin', 'success', {
        timeOut: 3000,
      }).onHidden.subscribe({
        next:()=>{
          window.location.reload();
        }
      });
    }, err => {
      //this.toastr.error('Error', err.status); 
    })
    
   // window.location.reload();
    }

  CreateGoal(body: any) {
     debugger
 
    this.http.post('https://localhost:7081/api/Goal/create',body).subscribe((resp: any) =>
    { }, err => {
      this.toastr.error('Error', err.status); 
    })
  }
  UpdateGoal(body: any) {
    debugger
    this.http.put('https://localhost:7081/api/Goal/update',body).subscribe((resp)=>{
   }, err => {
    // this.toastr.error('Error', err.status); 
   })
   
 }
  UploadAttachment(file: FormData) {
    
    this.http.post('https://localhost:7081/api/charity/uploadImage',file).subscribe((resp:any)=>{
      this.display_image= resp.imagePath; 

    },err=>{
    
      //this.toastr.error('Error', err.status); 
    });
    }

    
  ChrityPayment(body: any) {
    this.spin.show();

   this.http.post('https://localhost:7081/api/payment',body).subscribe((resp: any) =>
   {
    this.spin.hide();
    this.toastr.success('Thank You', 'success', {
      timeOut: 2000,
    }).onHidden.subscribe({
      next:()=>{
        window.location.reload();
      }
    });

   }, err => {
     //this.toastr.error('Error', err.status); 
   })
   
 }
 updateVisaCard(body:any){
  debugger
  this.http.put('https://localhost:7081/api/visaCard',body).subscribe((resp: any) =>
  {
       
  }, err => {
    //this.toastr.error('Error', err.status); 
  })
 }


  getVisaCard(){
  debugger

  this.http.get('https://localhost:7081/api/visaCard').subscribe((resp: any) => {

     this.Visa = resp;
   }, err => {
     //this.toastr.error('Error', err.status);
   })
 //console.log(this.Visa);
 }

 getUserVisaCard(user:any){
  this.http.get('https://localhost:7081/api/visaCard').subscribe((resp: any) => {

     this.Visa = resp.filter((V: any) => {
      
      return V.userId==user;

     });
   }, err => {
     //this.toastr.error('Error', err.status);
   })
 }

 userCharityVisa:any=[{}];
  getUserCharityVisaCard(user:any){
  this.http.get('https://localhost:7081/api/visaCard').subscribe((resp: any) => {

     this.userCharityVisa = resp.filter((V: any) => {
     
      return V.userId==user;
    })
   }, err => {
    // this.toastr.error('Error', err.status);
   })
 }

 AdminCharityVisa:any=[{}];
 getAdminVisaCard(){
  this.http.get('https://localhost:7081/api/visaCard').subscribe((resp: any) => {

     this.AdminCharityVisa = resp.filter((V: any) => {
     
      return V.cardNumber==Const.AdminCardNumber;
    })
   }, err => {
     //this.toastr.error('Error', err.status);
   })
 }
}
