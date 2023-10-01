import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ManagetestimonialService } from 'src/app/services/managetestimonial.service';
declare function refresh2(): any;

@Component({
  selector: 'app-manage-testimonial',
  templateUrl: './manage-testimonial.component.html',
  styleUrls: ['./manage-testimonial.component.css'],
})
export class ManageTestimonialComponent {
  user1 :any={} ;
  testOption: OwlOptions = {
    autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: false,
        items: 1,
        center: true,
        nav: false,
        margin: 50,
        dots: true,
        loop: true,
        responsive: {
            0: { items: 1,stagePadding:0 },
            480: { items: 1,stagePadding:0 },
            600: { items: 2,stagePadding:0 },
            991: { items: 3,stagePadding:0 },
            1500: { items: 4,stagePadding:100 }
        }
  };
  CreateTestimonial:FormGroup=new FormGroup({
    CONTENT:new FormControl('',Validators.required),
    RATE:new FormControl('',Validators.required),
    

  });
  userTestimonial:any={};
 
  constructor(public user:ManagetestimonialService,route : Router,public dialog: MatDialog) {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user1 = JSON.parse(userString);
    }
  }
  
  @ViewChild ('callDeleteDailog') callDelete !:TemplateRef<any>

  ngOnInit(): void{
    refresh2();
    this.user.getUserTestimonial();
  }
  deleteTestimonial(id :number){
   const dialogRef= this.dialog.open(this.callDelete);
dialogRef.afterClosed().subscribe((result)=>{
  if(result!=undefined)
  {
    if(result=='yes')
    {
      this.user.DeleteTestimonial(id );
    }
    else if(result=='no'){
      console.log("Thank you ");
    }
  }
})
}
@ViewChild('callCeateDailog') callCeateDailog!:TemplateRef<any>
OpenCreatetestimonial()
{
  this.dialog.open(this.callCeateDailog);
}
createTestimonial(){
  
  this.userTestimonial.CONTENT=this.CreateTestimonial.value.CONTENT;
  this.userTestimonial.RATE=this.CreateTestimonial.value.RATE;
  this.userTestimonial.testimonialDate=new Date().toISOString();
  this.userTestimonial.userId=this.user1.userId;
  this.userTestimonial.isAccepted=23;
  console.log(this.user1);
  console.log(this.userTestimonial);

 this.user.createtTestimonial(this.userTestimonial);
}
}

