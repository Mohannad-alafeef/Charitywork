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
export class AdminChatService {
  constructor() {
    this.connectToServer();
  }
  connection!: HubConnection;
  connectionId!: string;
  connected = false;
  chats: {
    [connectionId: string]: { name: string; role: number; email: string };
  } = {};
  senders: any[] = [];
  sendersId: any[] = [];
  chatNum = 0;
  groupMessages: any[] = [];
  groupJoined: string[] = [];
  connectToServer() {
    this.connection = new HubConnectionBuilder()
      .withAutomaticReconnect()
      .withUrl('wss://localhost:7081/chatHub', {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .build();
    this.connection
      .start()
      .then(() => {
        this.connected = true;
        this.getGroups();
        this.connection.invoke('JoinAdminGroup');
      })
      .catch((err) => {
        console.log(err);
      });
    this.connection.on('ReceiveGroupMessage', (message) => {
      console.log(message);
      
      this.getGroupMessages(message);
    });
    this.connection.on('NewGroup',()=>{
      this.getGroups();
    })
  }
  getGroups() {
    this.connection.invoke('GetGroups').then((res) => {
      console.log(res);
      this.chats = res;
      this.chatNum = Object.keys(this.chats).length;
      this.senders = Object.values(this.chats);
      this.sendersId = Object.keys(this.chats);
    });
  }
  joinGroup(group: string) {
    this.groupJoined.push(group);
    this.connection.invoke('JoinGroup', group);
  }
  sendToGroup(group: string, message: string) {
    this.connection.send('SendMessageToGroup', group,'Admin', message,Const.Admin);
  }
  getGroupMessages(group: string) {
    this.connection.invoke('GetGroupMessage', group).then((res) => {
      console.log(res);

      this.groupMessages = res;
    });
  }
}
