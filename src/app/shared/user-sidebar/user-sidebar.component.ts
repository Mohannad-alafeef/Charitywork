import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent {
  user :any={} ;
  
  constructor(private route : Router){
    const userString = localStorage.getItem('user');

    if (userString) {
      this.user = JSON.parse(userString);
    }
  }
  toggleSideBar(){
    document.querySelector('body')?.classList.toggle('toggle-sidebar');
  }
 


  logout(){
    localStorage.clear();
   this.route.navigate(['']);
  }
}
