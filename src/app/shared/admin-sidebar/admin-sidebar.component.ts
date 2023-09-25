import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';


@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  user :any={} ;

  constructor(private route : Router,public contact:ContactService){
    const userString = localStorage.getItem('user');

    if (userString) {
      this.user = JSON.parse(userString);
    }
    contact.getContact();
    
  }
  ngOnInit(): void {
    
  }
  toggleSideBar(){
    document.querySelector('body')?.classList.toggle('toggle-sidebar');
  }


  logout(){
    localStorage.clear();
   this.route.navigate(['']);
  }
}
