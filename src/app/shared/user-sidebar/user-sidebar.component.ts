import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent {
  constructor(private route : Router){}
  userName:any=localStorage.getItem('userName');
  firstName:any=localStorage.getItem('firstName');
  lastName:any=localStorage.getItem('lastName');
  ImagePath:any=localStorage.getItem('ImagePath');
  

  logout(){
    localStorage.clear();
   this.route.navigate(['']);
  }
}
