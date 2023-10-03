import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AdminChatService } from 'src/app/services/admin-chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  sChat: string = '';
  message = new FormControl(null, Validators.required);
  cSearch = '';
  constructor(public chat: AdminChatService) {}
  ngOnInit(): void {
    if (this.chat.connected) {
      this.chat.getGroups();
    }
  }
  selectedChat(key: string) {
    this.sChat = key;
    if (!this.chat.groupJoined.includes(key)) {
      this.chat.joinGroup(key);
    }
    this.chat.getGroupMessages(key);
    console.log(this.chat.connectionId);
    
    setTimeout(() => {
      let chatBottom = document.getElementById('chat-container');
      chatBottom?.scroll({
        top: chatBottom.scrollHeight,
      });
    }, 100);
  }
  sendMessage() {
    if (!this.message.valid) return;
    console.log(this.message.value);
    this.chat.sendToGroup(this.sChat, this.message.value!);
    this.message.setValue(null);
  }
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == 'Enter') this.sendMessage();
  }
}
