import { Component, TemplateRef, ViewChild } from '@angular/core';
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
 // issuesReport:any=[{}];
  ngOnInit(): void {
    refresh2();
    
  }
  constructor(public contactService:ContactService,private router:Router,private dialog:MatDialog){

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
  openDeleteDialog(id:number){
    this.selectedId = id;
    console.log(id);
    
    this.dialog.open(this.deleteDialog);
  }
  deleteMessage(){
    console.log('deleted '+this.selectedId);
    this.contactService.deleteMessage(this.selectedId);
  }
  updateStatus(id:number,status:number){
    this.contactService.updateStatus(id,status);
  }
}
