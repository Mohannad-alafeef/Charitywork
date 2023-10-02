import { Component, OnInit } from '@angular/core';
import { CharityViewService } from 'src/app/services/charity-view.service';

@Component({
  selector: 'app-all-charities',
  templateUrl: './all-charities.component.html',
  styleUrls: ['./all-charities.component.css']
})
export class AllCharitiesComponent implements OnInit {
  p:number = 1;
  search = '';
  constructor(public charityView:CharityViewService){

  }
  ngOnInit(): void {
    let user = localStorage.getItem('user');
    let userObj = JSON.parse(user!);
    this.charityView.getCharities(userObj.userId);
  }

}
