import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ManagetestimonialService } from 'src/app/services/managetestimonial.service';
import { Const } from 'src/app/shared/Const';
import {faTimes, faQuoteLeft,faUser,faExclamation,faReply,faCheck, IconDefinition} from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-manage-testimonials',
  templateUrl: './manage-testimonials.component.html',
  styleUrls: ['./manage-testimonials.component.css','../contact/contact.component.css']
})
export class ManageTestimonialsComponent implements OnInit {
  constructor(public testimonials:ManagetestimonialService,public dialog: MatDialog){}
  stars = [1, 2, 3, 4, 5];
constant=Const;
@ViewChild('deleteDialog') deleteDialog!: TemplateRef<any>;
@ViewChild('postDialog') postDialog!: TemplateRef<any>;
@ViewChild('rejectDialog') rejectDialog!: TemplateRef<any>;

filterradio:string='';

  ngOnInit(): void {
    this.testimonials.getAllTestimonial();
  }

  DeleteDialog(id:number){
    const dialogRef= this.dialog.open(this.deleteDialog) ;
    dialogRef.afterClosed().subscribe((result)=>{
      if(result!=undefined)
      {
      debugger
        if(result=='yes'){
         
          this.testimonials.DeleteTestimonial(id);
        }
      }
    })
  }
 PostDialog(body:any){
  const dialogRef= this.dialog.open(this.postDialog) ;
  dialogRef.afterClosed().subscribe((result)=>{
    if(result!=undefined)
    {
    debugger
      if(result=='yes'){
        body.isAccepted=Const.Accepted;
        this.testimonials.UpdateTestimonial(body);
      }
    }
  })
  }

  RejectDialog(body:any){
    const dialogRef= this.dialog.open(this.rejectDialog) ;
    dialogRef.afterClosed().subscribe((result)=>{
      if(result!=undefined)
      {
      debugger
        if(result=='yes'){
          body.isAccepted=Const.Rejected;
          this.testimonials.UpdateTestimonial(body);
        }
      }
    })
  }

  getIcon(status:number):IconDefinition{
   if(status == Const.Accepted){
      return faCheck;
    }
    else if(status == Const.Rejected){
      return faTimes;
    }
    return faExclamation;
  }
  getColor(status:number):string{
    if(status != Const.Accepted &&status != Const.Rejected){
      return '#FFC436';
    }else if(status == Const.Accepted){
      return '#146c43';
    }
    else if(status == Const.Rejected){
      return '#bf0a0a';
    }
    return '';
  }
}

