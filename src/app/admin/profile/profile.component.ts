import { ProfileService } from './../../services/profile.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, TemplateRef  } from '@angular/core';
import { CategoriesService } from './../../services/categories.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
<<<<<<< HEAD
declare function refresh2(): any;
=======
import { formatDate } from '@angular/common';
>>>>>>> 386703959ac080be1b139e3e99bb6aea886eaade

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user :any={} ;
  UpdateProfileForm: FormGroup;
  UpdateLoginForm:FormGroup;

  constructor(private route : Router, private fb: FormBuilder,private profileS:ProfileService, public dialog: MatDialog)
  {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    }

    this.UpdateProfileForm = this.fb.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email,[Validators.required,Validators.email]],
      phone: [this.user.phone, Validators.required],
      address: [this.user.address, Validators.required],
      gender: [this.user.gender, Validators.required],
      dateOfBirth: [formatDate(this.user.dateOfBirth, 'yyyy-MM-dd', 'en'), Validators.required],
      //age: [''], 
      //imagePath: [this.user.imagePath],
      userId:[this.user.userId],
    });

   this.UpdateLoginForm=this.fb.group({
    userName: ['', Validators.required],
    password :['', Validators.required],
    email: [this.user.email],
    loginId: [this.user.LoginId],
    });
    profileS.callback = (path)=>{
      this.user.imagePath = path;
    }
  }

  ngOnInit(): void
  {
    refresh2();
  }

  
  UploadImage(file:any){
    if(file.length==0)
    return ; 
    let fileToUpload = <File> file[0] ; 
    const formData = new FormData(); 
    formData.append('file',fileToUpload,fileToUpload.name); 
    this.profileS.UploadAttachment(formData);
  }
  
previous_data:any={};

  UpdateBtn(body:any)
  {  
    this.user.firstName = body.firstName;
    this.user.lastName = body.lastName;
    this.user.email = body.email;
    this.user.phone = body.phone;
    this.user.address = body.address;
    this.user.gender = body.gender;
    this.user.dateOfBirth = body.dateOfBirth;
   // this.user.imagePath = body.imagePath;
  
    localStorage.setItem('user', JSON.stringify(this.user));

    
    this.profileS.UpdateAccount(body);
      
  }

  UpdateLoginBtn(body:any){
    this.user.userName = body.userName;
    this.user.email = body.email;
  
    localStorage.setItem('user', JSON.stringify(this.user));

    this.profileS.UpdateLogin(body);
    }
}
