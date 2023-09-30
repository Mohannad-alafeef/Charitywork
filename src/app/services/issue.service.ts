import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Const } from '../shared/Const';

@Injectable({
  providedIn: 'root'
})

export class IssueService {

  allIssues:Array<any>=[];
  recentIssues:Array<any>=[];
  unreadedIssues:any[]=[];
  constructor(private http: HttpClient,private toastr:ToastrService, private router: Router) {}
  
 
GetUserById(userId: number) {
  return this.http.get(`https://localhost:7081/api/Account/${userId}`);
}

  GetAllIssues()
  {
    this.http.get('https://localhost:7081/api/IssuesReport/GetAllIssues').subscribe((resp:any)=>
    {
    this.allIssues=resp;
    for (const issue of this.allIssues) {
      this.GetUserById(issue.userId).subscribe((userData: any) => {
        issue.user = userData;
      });
    }

    console.log(this.allIssues);
    
    },
    err=>{
      this.toastr.error('Error', err.status);  
    })
  }
  
  CreateIssue(body: any) {
    body.issueStatus=30;
    this.http.post('https://localhost:7081/api/IssuesReport/CreateIssue',body).subscribe((resp: any) =>
    {
      this.toastr.success('Success'); 
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }, err => {
      this.toastr.error('Error', err.status); 
    })
  }

  updateStatus(id:number,status:number,index:number){
    this.http.put(`https://localhost:7081/api/IssuesReport/updateStatus`,{problemId:id,issueStatus:status}).subscribe({
      next:()=>{
 
        this.allIssues.at(index).issueStatus = status;
        this.recentIssues = this.recentIssues.map((obj:any)=>{
          if(obj.problemId == id){
            obj.issueStatus = status
          }
          return obj;
        });
      }
    })
  }


  DeleteIssue(id:number)
  {
    this.http.delete('https://localhost:7081/api/IssuesReport/Delete/'+id).subscribe((resp:any)=>
    {
      this.toastr.success('Success'); 
    },
    err=>{
      this.toastr.error('Error', err.status); 
    })
    window.location.reload();
  }

  send(body:any,id:number,index:number):Promise<any>{
    let sendPromise = new Promise<any>((res,rej)=>{
      this.http.post('https://localhost:7081/api/Email/sendNormal',body).subscribe({
      next:(r)=>{
        this.toastr.success('Message has Sent','',{
          positionClass:'toast-bottom-right'
        });
        setTimeout(()=>{

          res(r);
        },1000)
      },
      error:(err)=>{
        this.toastr.error(err,'',{
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
    this.DeleteIssue(id);
  }
  
}
