import { ProfileService } from './../../services/profile.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, TemplateRef  } from '@angular/core';
import { CategoriesService } from './../../services/categories.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user :any={} ;
  UpdateProfileForm: FormGroup;
  passwordChangeForm:FormGroup;

  isFormSubmitted = false;

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
      phone: [this.user.phone, [Validators.required,Validators.pattern('^[0-9]{10}$')]],
      address: [this.user.address, Validators.required],
      gender: [this.user.gender, Validators.required],
      dateOfBirth: [formatDate(this.user.dateOfBirth, 'yyyy-MM-dd', 'en'), Validators.required],
      userId:[this.user.userId],
    });


    this.passwordChangeForm = this.fb.group({
      loginId: [this.user.loginId],
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      renewPassword: ['', [Validators.required, Validators.minLength(8)]],

    });
    profileS.callback = (path)=>{
      this.user.imagePath = path;
    }

  }

  ngOnInit(): void
  {
   
  }
  changePassword(body: any) {
    debugger;
    const { currentPassword, newPassword, renewPassword } = this.passwordChangeForm.value;
  this.isFormSubmitted = true;
    if (currentPassword && newPassword && renewPassword) {
      if (currentPassword === this.user?.password) 
      {
        if (newPassword === renewPassword) {
          
          const { loginId, userName, email } = this.user;
          const password = newPassword;
          const ChangePassBody = [{ loginId, userName, password, email }];
  
          this.profileS.UpdateLogin(ChangePassBody[0]);
          this.user.password=newPassword;
          localStorage.setItem('user', JSON.stringify(this.user));

        } else {
          alert('New password and re-entered password do not match');
        }
      }
      else{ alert('Current Password is not correct');}
    }
  }
  
  
 UploadImage(file:any){
  if(file.length==0)
  return ; 
  let fileToUpload = <File> file[0] ; 
  const formData = new FormData(); 
  formData.append('file',fileToUpload,fileToUpload.name); 
  this.profileS.UploadAttachment(formData);
}


  UpdateBtn(body:any)
  {  
    this.user.firstName = body.firstName;
    this.user.lastName = body.lastName;
    this.user.email = body.email;
    this.user.phone = body.phone;
    this.user.address = body.address;
    this.user.gender = body.gender;
    this.user.dateOfBirth = body.dateOfBirth;
  
    localStorage.setItem('user', JSON.stringify(this.user));

    
    this.profileS.UpdateAccount(body);
      
  }

}
