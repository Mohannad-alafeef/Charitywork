import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  recentContact:any;
  allContact:any=[];
  constructor(private http: HttpClient,private toaster:ToastrService) {}

  async getContact(){
    let issues = new Promise((res, rej) => {
      this.http
        .get('https://localhost:7081/api/Contact')
        .subscribe({
          next: (resp) => {
            res(resp);
          },
          error: (err) => {
            rej(err);
          },
        });
    });

   await issues.then((res:any)=>{
    this.allContact = res;
    this.recentContact = res.sort((n1:any,n2:any)=>n1.contactId<n2.contactId).slice(0,4);
   });
  }
  deleteMessage(id:number){
    this.http.delete(`https://localhost:7081/api/Contact/delete/${id}`).subscribe({
      next:()=>{
        this.toaster.success('deleted','',{
          positionClass:'toast-bottom-right'
        });
        this.allContact = this.allContact.filter((obj:any)=>obj.contactId !=id);
        this.recentContact = this.recentContact.filter((obj:any)=>obj.contactId !=id);
      }
    })
  }
  updateStatus(id:number,status:number){
    this.http.put(`https://localhost:7081/api/Contact/updateStatus`,{contactId:id,contactStatus:status}).subscribe({
      next:()=>{
        this.toaster.success('Readed','',{
          positionClass:'toast-bottom-right'
        });
        this.allContact = this.allContact.map((obj:any)=>{
          if(obj.contactId == id){
            obj.contactStatus = status
          }
          return obj;
        });
        this.recentContact = this.recentContact.map((obj:any)=>{
          if(obj.contactId == id){
            obj.contactStatus = status
          }
          return obj;
        });
      }
    })
  }
}
