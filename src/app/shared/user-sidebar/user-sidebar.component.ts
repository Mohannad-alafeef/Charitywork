import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CharityService } from 'src/app/services/charity.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent {
  user :any={} ;
  
  constructor(private route : Router,public charity:CharityService){
    const userString = localStorage.getItem('user');

    if (userString) {
      this.user = JSON.parse(userString);
    }
  }
 


  logout(){
    localStorage.clear();
   
   
    this.route.navigate(['']);
     
  }
}
