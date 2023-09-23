import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';


@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent {
  user :any={} ;

  constructor(private route : Router,public contact:ContactService){
    const userString = localStorage.getItem('user');

    if (userString) {
      this.user = JSON.parse(userString);
    }
    contact.getContact();
    
  }



  logout(){
    localStorage.clear();
   this.route.navigate(['']);
  }
}
