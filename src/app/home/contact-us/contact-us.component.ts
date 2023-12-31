import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { HomeService } from 'src/app/services/home.service';

declare function refresh(): any;
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit{
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  contactForm:FormGroup=new FormGroup({
    senderName: new FormControl(null,[Validators.required]),
  senderEmail: new FormControl(null,[Validators.required,Validators.email]),
  contactSubject: new FormControl(null,[Validators.required]),
  contactContent: new FormControl(null,[Validators.required]),
  });
  constructor(public home:HomeService,private _snackBar:MatSnackBar){
    home.callback = () => {
      this.contactForm.reset();
      this.nameError();
      this.subjectError();
      this.contentError();
      this.emailError();
      _snackBar.open('Message Sent Successfully', undefined, {
        duration: 3 * 1000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['snackbar-panel'],
      });
    };
  }
  ngOnInit(): void {
    refresh();
  }
  sendMessage(){
    console.log(this.contactForm.value);
    this.home.sendMessage(this.contactForm.value)
  }
  nError:boolean|undefined = true;
  sError:boolean|undefined = true;
  cError:boolean|undefined = true;
  eError:boolean|undefined = true;
  nameError(){
    this.nError = this.contactForm.get('senderName')?.hasError('required')
    console.log(this.nError);
    
  }
  subjectError(){
    this.sError = this.contactForm.get('contactSubject')?.hasError('required');
    console.log(this.sError);
    
  }
  contentError(){
    this.cError =this.contactForm.get('contactContent')?.hasError('required');
    console.log(this.cError);
    
  }
  emailError(){
    this.eError = this.contactForm.get('senderEmail')?.hasError('required')||this.contactForm.get('senderEmail')?.hasError('email');
    console.log(this.eError);
    
  }

}
