import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent {
  @Input() charity!:any;
  getTotalPayment(payments:any[]):number{
    return payments.map(x=>x.amount).reduce((sum,el)=>sum +=el,0)
  }
  calcPercent(payments:any[],goal:number):number{
    let total = this.getTotalPayment(payments)
    return (total/goal)*100;
  }

}
