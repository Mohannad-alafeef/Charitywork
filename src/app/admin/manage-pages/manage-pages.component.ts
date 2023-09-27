import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PagesService } from 'src/app/services/pages.service';
declare function refresh2(): any;

@Component({
  selector: 'app-manage-pages',
  templateUrl: './manage-pages.component.html',
  styleUrls: ['./manage-pages.component.css']
})
export class ManagePagesComponent implements OnInit {
  constructor(public page:PagesService,route : Router,public dialog: MatDialog) 
  {

  }
  updateHomePageForm :FormGroup = new FormGroup
  ({
    title: new FormControl(''),
    imagePath:new FormControl(''),
    text:new FormControl('')
  })
  updateaboutPageForm :FormGroup = new FormGroup
  ({
    title: new FormControl(''),
    imagePath:new FormControl(''),
    text:new FormControl('')
  })
  
  updatecontactPageForm :FormGroup = new FormGroup
  ({
    title: new FormControl(''),
    emailAddress:new FormControl(''),
    phone:new FormControl(''),
    address:new FormControl(''),
    openHours:new FormControl('')
  })
  updatetestimonailPageForm :FormGroup = new FormGroup
  ({
    title: new FormControl(''),
    imagePath:new FormControl(''),
    text:new FormControl('')
  })


previous_data:any={};
 
  ngOnInit(): void{
    this.page.getHomePage();
    this.page.getAboutPage();
    this.page.getcontactPage();
    this.page.gettestimonialPage();
    refresh2();
    
  }

//home page
  openUpdatehomeDialog(body:any)
  {
    this.previous_data=body;
    const dialogRef =this.dialog.open(this.callUpdatehomeDialog);
    dialogRef.afterClosed().subscribe
    ((result)=>
    {
      if(result!=undefined)
      {
        if (result=="Update") 
        this.page.UpdateHomePage(body);
        else if (result=="cancel") 
          console.log('Thank You'); 
      }
   })
  }

  // about page
  openUpdateaboutDialog(body:any)
  {
    this.previous_data=body;
    const dialogRef =this.dialog.open(this.callUpdateaboutDialog);
    dialogRef.afterClosed().subscribe
    ((result)=>
    {
      if(result!=undefined)
      {
        if (result=="Update") 
        this.page.UpdateaboutPage(body);
        else if (result=="cancel") 
          console.log('Thank You'); 
      }
   })
  }
    // Contact page

  openUpdatecontactDialog(body:any)
  {
    this.previous_data=body;
    const dialogRef =this.dialog.open(this.callUpdatecontactDialog);
    dialogRef.afterClosed().subscribe
    ((result)=>
    {
      if(result!=undefined)
      {
        if (result=="Update") 
        this.page.UpdatecontactPage(body);
        else if (result=="cancel") 
          console.log('Thank You'); 
      }
   })
  }
   // testimonial page
  openUpdatetestimonialDialog(body:any)
  {
    this.previous_data=body;
    const dialogRef =this.dialog.open(this.callUpdateTestimonialDialog);
    dialogRef.afterClosed().subscribe
    ((result)=>
    {
      if(result!=undefined)
      {
        if (result=="Update") 
        this.page.UpdatetestimonialPage(body);
        else if (result=="cancel") 
          console.log('Thank You'); 
      }
   })
  }



  UploadhomeImage(file:any){
    if(file.length==0)
    return ; 
    let fileToUpload = <File> file[0] ; 
    const formData = new FormData(); 
    formData.append('file',fileToUpload,fileToUpload.name); 
    this.page.UploadhomeAttachment(formData);
  }

  UploadaboutImage(file:any){
    if(file.length==0)
    return ; 
    let fileToUpload = <File> file[0] ; 
    const formData = new FormData(); 
    formData.append('file',fileToUpload,fileToUpload.name); 
    this.page.UploadaboutAttachment(formData);
  }
  UploadtestimonialImage(file:any){
    if(file.length==0)
    return ; 
    let fileToUpload = <File> file[0] ; 
    const formData = new FormData(); 
    formData.append('file',fileToUpload,fileToUpload.name); 
    this.page.UploadtestimonialAttachment(formData);
  }
  
  


  @ViewChild('callUpdatehomeDialog') callUpdatehomeDialog !: TemplateRef <any>
  @ViewChild('callUpdateaboutDialog') callUpdateaboutDialog !: TemplateRef <any>
  @ViewChild('callUpdatecontactDialog') callUpdatecontactDialog !: TemplateRef <any>
  @ViewChild('callUpdateTestimonialDialog') callUpdateTestimonialDialog !: TemplateRef <any>

  
}

