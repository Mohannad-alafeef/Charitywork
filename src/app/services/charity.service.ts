import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CharityService {

  constructor(private http:HttpClient , public spin:NgxSpinnerService,public toas:ToastrService) { }
  charities:any =[{'user':{},'category':{}}];

  goals:any=[{}];
  addGoal:any={}
  user:any={};
  display_image:any;
  charityId:any;
  getAllCharities(){
    debugger;
    this.spin.show;

     this.http.get('https://localhost:7081/api/Charity/getAll').subscribe((resp:any)=>{
       this.charities=resp;
       //this.spin.hide;
       debugger;
      console.log(this.charities);
     },err=>{
       console.log(err.status);
     })
   }

   DeleteCharity(id:number){
        debugger;
        this.http.delete('https://localhost:7081/api/charity/'+id).subscribe((resp:any)=>{
      //alert('Deleted');
      window.location.reload();
      this.toas.error('delete success');
      
      },err=>{
      console.log(err);
      })
   }

   updateChrity(body:any){
      debugger;
      this.http.put('https://localhost:7081/api/charity/Update',body).subscribe((resp)=>{
      this.spin.hide;
      //alert('update successfully');
      this.toas.success('update success');
      window.location.reload();
    },err=>{
      console.log
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
      this.toas.success('Charity was Sent successfuly to the admin');
    }, err => {
      this.toas.error('Error', err.status); 
    })
    
    //window.location.reload();
  }

  CreateGoal(body: any) {
     debugger
 
    this.http.post('https://localhost:7081/api/Goal/create',body).subscribe((resp: any) =>
    {
  
    }, err => {
      this.toas.error('Error', err.status); 
    })
    
  }
  UploadAttachment(file: FormData) {
    
    this.http.post('https://localhost:7081/api/charity/uploadImage',file).subscribe((resp:any)=>{
      this.display_image= resp.imagePath; 
      console.log(resp);
      //this.toas.success('Success'); 
    },err=>{
      //alert('somthing wrong');
      this.toas.error('Error', err.status); 
    });
    }
}
