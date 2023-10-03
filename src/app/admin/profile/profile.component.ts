import { ProfileService } from './../../services/profile.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, TemplateRef  } from '@angular/core';
import { CategoriesService } from './../../services/categories.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['',[Validators.required,Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      //age: [''], 
      imagePath: [''],
      userId:[this.user.userId],
    });

   this.UpdateLoginForm=this.fb.group({
    userName: ['', Validators.required],
    password :['', Validators.required],
    email: [this.user.email],
    loginId: [this.user.LoginId],
    });
  }

  ngOnInit(): void
  {
   
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
    this.user.imagePath = body.imagePath;
  
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
