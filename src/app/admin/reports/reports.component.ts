import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit,OnDestroy,AfterViewInit {
  @ViewChild(DataTableDirective, {static: false})
  private datatableElement!: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  sub!:Subscription;
  constructor(public reports:ReportsService){}
  ngAfterViewInit(): void {
    this.dtTrigger.next(this.reports.dtOptions);
  }
  ngOnInit(): void {
    this.sub = this.reports.paymentsObservable.subscribe({
      next:(res)=>{
        this.dtTrigger.next(this.reports.dtOptions);
        this.dataTabel();
      }
    });
    this.dataTabel();
  }
  dataTabel(){
    try{
      this.datatableElement.dtInstance.then((dtInstance:any)=>{
        console.log(dtInstance.buttons.container);
        
      });
    }catch(e:any){

    }
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.dtTrigger.unsubscribe();
    
  }
}
