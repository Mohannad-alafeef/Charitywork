import { Injectable } from '@angular/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  togglechat = false;
  showChat = false;
  showForm = true;
  name = '';
  email = '';
  constructor() {}

  connection!:HubConnection;
  connectionId!:string;
  groupMessages: any[] = [];
  connectToChat() {
    this.connection = new HubConnectionBuilder()
      .withAutomaticReconnect()
      .withUrl('wss://localhost:7081/chatHub',{
        skipNegotiation:true,
        transport:HttpTransportType.WebSockets
      })
      .build();
    this.connection.start().then(()=>{
      
    }).catch((err) => {
      console.log(err);
    });
    this.connection.on('ReceiveMessage',(message)=>{
      this.connectionId = message;
      this.connectToGroup();
    });
    this.connection.on('ReceiveGroupMessage', (message) => {
      console.log(message);
      
      this.getGroupMessages(message);
    });
  }
  toggleChat(){
    this.togglechat = !this.togglechat;
  }
  toggleView(){
    this.showChat = true;
    this.showForm = false;
  }
  connectToGroup(){
    this.connection.invoke('StartChat',({role:0,name:this.name,email:this.email})).then(()=>{
      this.toggleView();
    }).catch((err)=>{
      console.log(err);
      
    })
  }
  sendToGroup(message: string) {
    this.connection.send('SendMessageToGroup', this.connectionId,this.name, message,0);
  }
  getGroupMessages(group: string) {
    this.connection.invoke('GetGroupMessage', group).then((res) => {
      console.log(res);

      this.groupMessages = res;
    });
  }
}
