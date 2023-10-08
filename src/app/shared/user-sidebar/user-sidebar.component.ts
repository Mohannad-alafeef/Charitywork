import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CharityService } from 'src/app/services/charity.service';
import { ChatService } from 'src/app/services/chat.service';
import { Const } from '../Const';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css'],
})
export class UserSidebarComponent {
  user: any = {};
  chatForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  message = new FormControl(null, Validators.required);

  constructor(
    private route: Router,
    public charity: CharityService,
    public chat: ChatService
  ) {
    const userString = localStorage.getItem('user');

    if (userString) {
      this.user = JSON.parse(userString);
    }
    chat.connectToChat();
  }
  toggleSideBar() {
    document.querySelector('body')?.classList.toggle('toggle-sidebar');
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');


    this.route.navigate(['']);
  }
  submit() {
    
    this.chat.name = this.chatForm.get('name')?.value;
    this.chat.email = this.chatForm.get('email')?.value;
    this.chat.startChat(Const.User);
  }
  sendMessage() {
    console.log(this.message.value);

    if (!this.message.valid) return;
    console.log('valid');
    this.chat.sendToGroup(this.message.value!,Const.User);
    this.message.setValue(null);
  }
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == 'Enter') this.sendMessage();
  }
}
