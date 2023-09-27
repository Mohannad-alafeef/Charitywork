import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Const } from '../shared/Const';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  recentContact:Array<any>=[];
  allContact:Array<any>=[];
  unreadedContact:any[]=[];
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
    this.unreadedContact = this.allContact.filter((x:any)=> x.contactStatus == Const.Unread);
   });
  }
  deleteMessage(id:number,index:number){
    this.http.delete(`https://localhost:7081/api/Contact/delete/${id}`).subscribe({
      next:()=>{
        this.toaster.success('deleted','',{
          positionClass:'toast-bottom-right'
        });
        
        this.allContact = this.allContact.splice(index,1);
        this.recentContact = this.recentContact.filter((obj:any)=>obj.contactId !=id);
        
      }
    })
  }
  updateStatus(id:number,status:number,index:number){
    this.http.put(`https://localhost:7081/api/Contact/updateStatus`,{contactId:id,contactStatus:status}).subscribe({
      next:()=>{
 
        this.allContact.at(index).contactStatus = status;
        this.recentContact = this.recentContact.map((obj:any)=>{
          if(obj.contactId == id){
            obj.contactStatus = status
          }
          return obj;
        });
      }
    })
  }
  send(body:any,id:number,index:number):Promise<any>{
    let sendPromise = new Promise<any>((res,rej)=>{
      this.http.post('https://localhost:7081/api/Email/sendNormal',body).subscribe({
      next:(r)=>{
        this.toaster.success('Message has Sent','',{
          positionClass:'toast-bottom-right'
        });
        setTimeout(()=>{

          res(r);
        },1000)
      },
      error:(err)=>{
        this.toaster.error(err,'',{
          positionClass:'toast-bottom-right'
        });
        rej(err);
      }
    })
    });
    return sendPromise.then(()=>{
      this.updateStatus(id,Const.Replied,index);
    })
   
  }
  async sendAndDelete(body:any,id:number,index:number){
    await this.send(body,id,index);
    this.deleteMessage(id,index);
  }

}
