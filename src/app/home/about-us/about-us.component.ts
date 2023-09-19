import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

declare function refresh(): any;
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUSComponent implements OnInit {
  constructor(public home:HomeService){
    
  }
  ngOnInit(): void {
    refresh();
  }
}
