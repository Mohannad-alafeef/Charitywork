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
 
}
