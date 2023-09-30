import { IssueService } from './../../services/issue.service';
import { Component, TemplateRef, ViewChild,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { faQuoteLeft,faUser,faExclamation,faReply,faCheck, IconDefinition} from '@fortawesome/free-solid-svg-icons'
import { Const } from 'src/app/shared/Const';
declare function refresh2(): any;
@Component({
  selector: 'app-manage-issues',
  templateUrl: './manage-issues.component.html',
  styleUrls: ['./manage-issues.component.css']
})
export class ManageIssuesComponent implements OnInit { 

  readed = Const.Readed;
  unread=Const.Unread;
  replied=Const.Replied;
  selectedId:number = -1 ;
  currentIndex:number = -1;
  replyForm:FormGroup;

  constructor(public IssueS:IssueService,private router:Router,
    private dialog:MatDialog,private fb:FormBuilder)
    {
      this.replyForm = fb.group(
        {
          reciverEmail:['',Validators.required],
          subject:['',Validators.required],
          body:['',Validators.required]
        }
      )

    } 

  ngOnInit(): void {
    refresh2();
    this.IssueS.GetAllIssues();

}
  getIcon(status:number):IconDefinition{
    if(status == Const.Unread){
      return faExclamation;
    }else if(status == Const.Replied){
      return faReply;
    }
    else if(status == Const.Readed){
      return faCheck;
    }
    return faUser;
  }

  getColor(status:number):string{
    if(status == Const.Unread){
      return '#FFC436';
    }else if(status == Const.Replied){
      return 'green';
    }
    else if(status == Const.Readed){
      return '#3085C3';
    }
    return '';
  }

  getCurrentRoute():string{
    return this.router.url;
  }

  updateStatus(id:number,status:number,index:number){
    this.IssueS.updateStatus(id,status,index);
  }

  openDeleteDialog(id:number)
  { 
    const dialogRef= this.dialog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe
    ((result)=>
    {
      if(result!=undefined)
      {
        if (result=="Yes") 
          this.IssueS.DeleteIssue(id); 
        else if (result=="No") 
          console.log('Thank You'); 
      }
   })
 }

 name:string='';
 openReplyDialog(name:string,email:string,problemId:number,index:number){
   this.currentIndex = index;
   this.selectedId = problemId;
   this.name = name;
   this.replyForm.reset();
   this.replyForm.controls['reciverEmail'].setValue(email);
   this.dialog.open(this.CallReplyDialog,{
     maxWidth:'100%',
     minWidth:'50%'
   });
 }
 send(){
   console.log(this.replyForm.value);
   this.IssueS.send(this.replyForm.value,this.selectedId,this.currentIndex)
   
 }
 sendAndDelete(){
   console.log(this.replyForm.value);
   this.IssueS.sendAndDelete(this.replyForm.value,this.selectedId,this.currentIndex);
 }
 @ViewChild('callDeleteDialog') callDeleteDialog !: TemplateRef <any>;

 @ViewChild('CallReplyDialog') CallReplyDialog !: TemplateRef <any>;

}