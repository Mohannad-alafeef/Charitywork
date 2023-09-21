

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private auth:AuthService){}
  email=new FormControl ('ex@example.com',[Validators.required,Validators.email]);
  Password=new FormControl('********',[Validators.required,Validators.minLength(8)]);
  
  submit(){
    this.auth.Login(this.email,this.Password);
  }

}
