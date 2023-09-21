import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {

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
