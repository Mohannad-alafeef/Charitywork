import { Injectable } from '@angular/core';
import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
} from '@microsoft/signalr';
import { Const } from '../shared/Const';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  togglechat = false;
  showChat = false;
  showForm = true;
  name = '';
  email = '';
  constructor() {
    // this.connectionId = localStorage.getItem('connectionId');
    // if(this.connectionId!= null){
    //   this.showChat = true;
    //   this.showForm = false;
    //   this.connected = true;
    // }
  }

  connection!: HubConnection;
  connected = false;
  connectionId!: string;
  groupMessages: any[] = [];
  lastGroup!: string | null;
  connectToChat() {
    this.lastGroup = localStorage.getItem('lastGroup');
    console.log(this.lastGroup);

    this.connection = new HubConnectionBuilder()
      .withAutomaticReconnect()
      .withUrl('https://localhost:7081/chatHub', {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .build();
    this.connection
      .start()
      .then(() => {
        this.connected = true;
        this.checkGroup();
      })
      .catch((err) => {
        console.log(err);
      });
    this.subscribe();
  }
  toggleChatContainer() {
    this.togglechat = !this.togglechat;
  }
  showChatView() {
    this.showChat = true;
    this.showForm = false;
  }
  hideChatView() {
    this.showChat = false;
    this.showForm = true;
  }
  hideChatContainer() {
    this.togglechat = false;
  }
  subscribe() {
    this.connection.on('Connected', (message) => {
      this.connectionId = message;
    });
    this.connection.on('Disconnected', (message) => {
      console.log('disc : ' + message);
    });
    this.connection.on('ReceiveGroupMessage', (message) => {
      console.log(message);

      this.getGroupMessages(message);
    });
    this.connection.on('ChatStarted', (group) => {
      this.lastGroup = group;
      localStorage.setItem('lastGroup', group);
    });
  }
  checkGroup() {
    console.log('check');

    if (this.lastGroup != null) {
      console.log('last');

      this.connection.invoke('IsGroup', this.lastGroup).then((isExist) => {
        if (isExist) {
          console.log('exist');

          this.joinGroup();
          this.getGroupMessages(this.lastGroup!);
          this.showChatView();
        } else {
          this.lastGroup = null;
          localStorage.removeItem('lastGroup');
        }
      });
    }else{
      this.hideChatView();
      this.hideChatContainer();
    }
  }
  joinGroup() {
    this.connection.invoke('JoinGroup', this.lastGroup);
  }
  startChat(role1: number) {
    this.connection
      .invoke('StartChat', {
        role: role1,
        name: this.name,
        email: this.email,
      })
      .then(() => {
        this.showChatView();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  sendToGroup(message: string, role: number) {
    this.connection.send(
      'SendMessageToGroup',
      this.lastGroup,
      this.name,
      message,
      role
    );
  }
  getGroupMessages(group: string) {
    this.connection.invoke('GetGroupMessage', group).then((res) => {
      console.log(res);

      this.groupMessages = res;
    });
  }
}
