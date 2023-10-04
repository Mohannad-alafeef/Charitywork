import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { PaymentComponent } from '../payment/payment.component';
import { MatDialog } from '@angular/material/dialog';
import { Const } from 'src/app/shared/Const';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent {
  constructor(public dialog: MatDialog){}
  @ViewChild('donate')donate !:TemplateRef<any>
  @Input() charity!:any;
  constant=Const;
  getTotalPayment(payments:any[]):number{
    return payments.filter((x:any)=>x.paymentType == Const.Donation).map(x=>x.amount).reduce((sum,el)=>sum +=el,0)
  }
  calcPercent(payments:any[],goal:number):number{
    let total = this.getTotalPayment(payments)
    return (total/goal)*100;
  }

  Donate(){
    this.dialog.open(this.donate) ;

  }
}
