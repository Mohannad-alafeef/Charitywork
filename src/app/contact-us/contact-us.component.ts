import { Component, OnInit } from '@angular/core';

declare function refresh(): any;
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit{
  ngOnInit(): void {
    refresh();
  }

}
