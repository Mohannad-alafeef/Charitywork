import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  setData(event: any) {
    console.log(event.target);
    this.rememberMe = event.target!.checked
    console.log(this.rememberMe);
    
    
  }
  emailChanged = false;
  passChanged = false;
  formSubmitted = false;
  rememberMe = false;
  userNameOrEmail:string|null=null;
  sessionPassword:string|null=null;
  constructor(private auth: AuthService) {
    auth.callback = (email,pass)=>{
      if(this.rememberMe){
        localStorage.setItem('userNameOrEmail',email);
        localStorage.setItem('password',pass);
      }else{
        localStorage.removeItem('userNameOrEmail');
        localStorage.removeItem('password');
      }
    }
  }
  ngOnInit(): void {
    this.userNameOrEmail = localStorage.getItem('userNameOrEmail');
    this.sessionPassword = localStorage.getItem('password');
    if(this.userNameOrEmail!=null){
      this.email.setValue(this.userNameOrEmail);
      this.Password.setValue(this.sessionPassword);
      this.rememberMe = true;
    }
  }
  email = new FormControl('', [Validators.required]);
  Password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  submit() {
    this.formSubmitted = true;
    if (this.email.invalid || this.Password.invalid) return;
    this.auth.Login(this.email, this.Password);
  }
}
