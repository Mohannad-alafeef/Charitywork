import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataTableDirective } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject, Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit,OnDestroy,AfterViewInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  dtTrigger: Subject<ADTSettings> = new Subject();
  sub:Subscription|null = null;
  @ViewChild('infoDialog') infoDialog!: TemplateRef<any>;
  constructor(public users:UsersService,private dialog:MatDialog){
     
    users.infoCallback = (data)=>{
     this.userDialog(data); 
    }
    
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next(this.users.dtOptions);
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.dtTrigger.unsubscribe();
  }
  ngOnInit(): void {
    this.sub = this.users.userObservable.subscribe({
      next:()=>{
        this.dtTrigger.next(this.users.dtOptions);
      }
    })
  }
  // rerender(): void {
  //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //     // Destroy the table first
  //     dtInstance.destroy();
  //     // Call the dtTrigger to rerender again
  //     this.users.dtTrigger.next();
  //   });
  // }
  selectedUser:any;
  userDialog(user:any){
    this.selectedUser = user;
    this.dialog.open(this.infoDialog,{
      maxWidth:'100%',
      minWidth:'50%'
    });
    
  }

}
