import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CharityService {

  constructor(private http:HttpClient , public spin:NgxSpinnerService,public toas:ToastrService) {
  
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
   
    this.spin.show;

     this.http.get('https://localhost:7081/api/Charity/getAll').subscribe((resp:any)=>{
     
      this.usercharities= resp.filter((ch:any)=>{return ch.user.userId==userId;})
      this.charities=resp;
      this.spin.hide;

     },err=>{
       console.log(err.status);
     })
   }
  getAllCharities(){
    debugger;
    this.spin.show;

    this.http.get('https://localhost:7081/api/Charity/getAll').subscribe((resp:any)=>{

    this.charities=resp;
    this.spin.hide;

     },err=>{
       console.log(err.status);
     })
   }

   DeleteCharity(id:number){
      debugger;
      this.spin.show;
      this.http.delete('https://localhost:7081/api/charity/'+id).subscribe((resp:any)=>{
     
      this.toas.success('delete success');
      this.spin.hide;
      },err=>{
      console.log(err.status);
      })
    //  window.location.reload();
   }

   updateChrity(body:any){
      debugger;
      this.spin.show;
      this.http.put('https://localhost:7081/api/charity/Update',body).subscribe((resp)=>{
      
      this.toas.success('update success');
      this.spin.hide;
      
    },err=>{
      console.log(err.status);
    })
    //window.location.reload();
   }
   
    updateChrityInfo(charity:any,goal:any){
    debugger;
    if(this.display_image!=null)
      charity.imagePath=this.display_image;
    
    this.spin.show;
    this.http.put('https://localhost:7081/api/charity/Update',charity).subscribe((resp)=>{
    debugger;
    for(var i=0;i<goal.length;i++)
    {   
      this.UpdateGoal(goal[i]);
    }

    this.spin.hide;
    this.toas.success('update success');
   
      },err=>{
        console.log(err.status);
      })
    // window.location.reload();
    }

   async getGoals(id:number)
   {
       await this.http.get('https://localhost:7081/api/Goal/charityGoals/'+id).subscribe((resp:any)=>{
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
      this.toas.success('Charity was Sent successfuly to the admin');
    }, err => {
      this.toas.error('Error', err.status); 
    })
    
   // window.location.reload();
    }

  CreateGoal(body: any) {
     debugger
 
    this.http.post('https://localhost:7081/api/Goal/create',body).subscribe((resp: any) =>
    { }, err => {
      this.toas.error('Error', err.status); 
    })
  }
  UpdateGoal(body: any) {
    debugger

    this.http.put('https://localhost:7081/api/Goal/update',body).subscribe((resp)=>{
 
   }, err => {
     this.toas.error('Error', err.status); 
   })
   
 }
  UploadAttachment(file: FormData) {
    
    this.http.post('https://localhost:7081/api/charity/uploadImage',file).subscribe((resp:any)=>{
      this.display_image= resp.imagePath; 

    },err=>{
    
      this.toas.error('Error', err.status); 
    });
    }

    
  ChrityPayment(body: any) {
    this.spin.show();

   this.http.post('https://localhost:7081/api/payment',body).subscribe((resp: any) =>
   {
    this.spin.hide();
    this.toas.success('Posted successfuly'); 
   }, err => {
     this.toas.error('Error', err.status); 
   })
   
 }
 updateVisaCard(body:any){

  this.http.put('https://localhost:7081/api/visaCard',body).subscribe((resp: any) =>
  {
       
  }, err => {
    this.toas.error('Error', err.status); 
  })
 }


  VisaCardByNmber(){
  debugger

  this.http.get('https://localhost:7081/api/visaCard').subscribe((resp: any) => {

     this.Visa = resp;
   }, err => {
     this.toas.error('Error', err.status);
   })
 //console.log(this.Visa);
 }
}
