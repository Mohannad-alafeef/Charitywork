import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatService } from 'src/app/services/chat.service';
import { HomeService } from 'src/app/services/home.service';
import { Const } from '../Const';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  chatForm:FormGroup = new FormGroup({
    name: new FormControl(null,[Validators.required]),
    email: new FormControl(null,[Validators.required,Validators.email]),
  });
  message = new FormControl(null,Validators.required);
  
  constructor(public home:HomeService,public chat:ChatService,private fb:FormBuilder){
    home.getCharities();
    home.getHomePage();
    home.getContactPage();
    home.getAboutPage();
    home.getTest();
    home.getUserTest();
    home.getPayments();
    chat.connectToChat();
    
  }
  submit(){
    this.chat.name = this.chatForm.get('name')?.value;
    this.chat.email = this.chatForm.get('email')?.value
    this.chat.startChat(Const.Guest);
  }
  sendMessage(){
    console.log(this.message.value);
    
    if(!this.message.valid) return;
    console.log('valid');
    this.chat.sendToGroup(this.message.value!,Const.Guest);
    this.message.setValue(null);

  }
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == 'Enter') this.sendMessage();
  }
  

}
