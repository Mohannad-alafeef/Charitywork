import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminChatService } from 'src/app/services/admin-chat.service';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css'],
})
export class AdminSidebarComponent implements OnInit {
  user: any = {};
  

  constructor(
    private route: Router,
    public contact: ContactService,
    private router: Router,
    public chat: AdminChatService
  ) {
    const userString = localStorage.getItem('user');

    if (userString) {
      this.user = JSON.parse(userString);
    }
    contact.getContact();

  }
  ngOnInit(): void {
    if(this.chat.connected){

      this.chat.getGroups();
    }
    let btt = document.querySelector('#back-to-top');
    console.log(btt);

    document.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        btt!.classList.add('active');
      } else {
        btt!.classList.remove('active');
      }
    });
  }
  toggleSideBar() {
    document.querySelector('body')?.classList.toggle('toggle-sidebar');
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.route.navigate(['']);
  }
  getCurrentRoute(): string {
    return this.router.url;
  }
  scrollIntoView() {
    let main = document.getElementById('main');
    main?.scrollIntoView();
  }
}
