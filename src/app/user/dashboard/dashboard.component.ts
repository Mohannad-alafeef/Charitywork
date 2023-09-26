import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCharityComponent } from '../create-charity/create-charity.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(public dialog: MatDialog ){}
  @ViewChild('openCreate')openCreate !:TemplateRef<any>

  openCreateDialog(){
   this.dialog.open(CreateCharityComponent) ;
 
  }
}
