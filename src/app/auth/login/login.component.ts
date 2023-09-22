

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailChanged=false;
  passChanged=false;
  formSubmitted=false;
  constructor(private auth:AuthService){}
  email=new FormControl ('',[Validators.required]);
  Password=new FormControl('',[Validators.required,Validators.minLength(8)]);
  
  submit(){
    this.formSubmitted = true;
    if(this.email.invalid||this.Password.invalid) return;
    this.auth.Login(this.email,this.Password);
  }

}
