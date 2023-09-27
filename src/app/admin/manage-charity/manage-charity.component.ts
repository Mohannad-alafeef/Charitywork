import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesService } from 'src/app/services/categories.service';
import { CharityService } from 'src/app/services/charity.service';
import { Const } from 'src/app/shared/Const';
declare function refresh2(): any;

@Component({
  selector: 'app-manage-charity',
  templateUrl: './manage-charity.component.html',
  styleUrls: ['./manage-charity.component.css']
})
export class ManageCharityComponent implements OnInit {
constructor(public charity:CharityService,public dialog: MatDialog,public categories:CategoriesService ){}

constant=Const;
@ViewChild('seeMore')seeMore !:TemplateRef<any>

_filterText:string='';
filterradio:string='';
filterSelect:string='';
startDate:string='';
endDate:string='';

clearFilter(){
  
this._filterText='';
this.filterradio='';
this.filterSelect='';
this.startDate='';
this.endDate='';

}
  charityy:any={};
  ngOnInit(): void {
    //refresh2();
     this.charity.getAllCharities();
     this.categories.GetAllCategories();
    console.log(this.categories.categories);
  }

  seeMoreDialog(body:any)
  {
    this.charityy=body;
    this.charity.getGoals(body.charityId);
    const dialogRef= this.dialog.open(this.seeMore) ;
    dialogRef.afterClosed().subscribe((result)=>{
      if(result!=undefined)
   
      {
      debugger
        if(result=='accept'){
          body.isAccepted=Const.Accepted;
          this.charity.updateChrity(body);
        }
       
        else if(result=='reject')
        {
          body.isAccepted=Const.Rejected;
          this.charity.updateChrity(body);
        }
        else if(result=='delete')
        this.charity.DeleteCharity(body.charityId);
    
      }
    })
  }

}
