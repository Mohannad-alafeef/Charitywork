import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { faQuoteLeft,faUser,faExclamation,faReply,faCheck, IconDefinition} from '@fortawesome/free-solid-svg-icons'
import { ContactService } from 'src/app/services/contact.service';
import { Const } from 'src/app/shared/Const';
declare function refresh2(): any;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  readed = Const.Readed;
  unread=Const.Unread;
  replied=Const.Replied;
  @ViewChild('deleteDialog') deleteDialog!: TemplateRef<any>;
  @ViewChild('replyDialog') replyDialog!: TemplateRef<any>;
  p = 1
 // issuesReport:any=[{}];
  ngOnInit(): void {
    refresh2();
    
  }
  
  replyForm:FormGroup;
  constructor(public contactService:ContactService,private router:Router,private dialog:MatDialog,private fb:FormBuilder){
    this.replyForm = fb.group(
      {
        reciverEmail:['',Validators.required],
        subject:['',Validators.required],
        body:['',Validators.required]
      }
    )
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
  selectedId:number = -1 ;
  currentIndex = -1;
  openDeleteDialog(id:number,index:number){
    this.selectedId = id;
    this.currentIndex = index;
    console.log(id);
    console.log(index);
    
    this.dialog.open(this.deleteDialog);
  }
  deleteMessage(){
    console.log('deleted '+this.selectedId);
    this.contactService.deleteMessage(this.selectedId,this.currentIndex);
  }
  updateStatus(id:number,status:number,index:number){
    this.contactService.updateStatus(id,status,index);
  }
  name:string='';
  openReplyDialog(name:string,email:string,contactId:number,index:number){
    this.currentIndex = index;
    this.selectedId = contactId;
    this.name = name;
    this.replyForm.reset();
    this.replyForm.controls['reciverEmail'].setValue(email);
    this.dialog.open(this.replyDialog,{
      maxWidth:'100%',
      minWidth:'50%'
    });
  }
  send(){
    console.log(this.replyForm.value);
    this.contactService.send(this.replyForm.value,this.selectedId,this.currentIndex)
    
  }
  sendAndDelete(){
    console.log(this.replyForm.value);
    this.contactService.sendAndDelete(this.replyForm.value,this.selectedId,this.currentIndex);
  }
  
}
