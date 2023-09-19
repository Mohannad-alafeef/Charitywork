import { Component } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(public home:HomeService){
    home.getCharities();
    home.getHomePage();
    home.getContactPage();
    home.getAboutPage();
    home.getTest();
    home.getUserTest();
    home.getPayments();
    
  }

}
