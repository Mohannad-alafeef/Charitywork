import { Component, OnInit } from '@angular/core';

declare function refresh(): any;
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
})
export class AboutUSComponent implements OnInit {
  ngOnInit(): void {
    refresh();
  }
}
