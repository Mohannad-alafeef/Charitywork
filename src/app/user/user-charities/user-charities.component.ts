import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCharityComponent } from '../create-charity/create-charity.component';
import { CharityService } from 'src/app/services/charity.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { Const } from 'src/app/shared/Const';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-charities',
  templateUrl: './user-charities.component.html',
  styleUrls: ['./user-charities.component.css']
})
export class UserCharitiesComponent {
  constructor(public charity:CharityService,public dialog: MatDialog,public categories:CategoriesService ,private toaster:ToastrService){
    const userString = localStorage.getItem('user');

    if (userString) {
      this.user = JSON.parse(userString);
    }
  }

  constant=Const;
    @ViewChild('openCreate')openCreate !:TemplateRef<any>
    @ViewChild('seeMore')seeMore !:TemplateRef<any>
    @ViewChild('updateCharity')updateCharity !:TemplateRef<any>
    @ViewChild('deleteDialog')deleteDialog !:TemplateRef<any>
    @ViewChild('payDialog')payDialog !:TemplateRef<any>

    
  formControlsChanged = false;
  charityy:any={};
  selectCharity:any={};
  goals:any=[{}];
  user:any={};
  paymentBody:any={};
  visaBody:any={};
  visaNotFound:boolean=false;
  balanceCheck:boolean=false;
  expCheck:boolean=false;
  VisaCard:FormGroup=new FormGroup({
 
    CardNumber:new FormControl('',[Validators.required]),
    cvv:new FormControl('',[Validators.required]),
    expDate:new FormControl('',[Validators.required]),
 
   
  })
 UpdateCharity:FormGroup=new FormGroup({
    categoryId:new FormControl('',[Validators.required]),
    charityName:new FormControl('',[Validators.required]),
    mission:new FormControl('',[Validators.required]),
    latitude:new FormControl('00',[Validators.required]),
    longitude:new FormControl('00',[Validators.required]),
    imagePath:new FormControl(this.selectCharity.imagePath),
    donationGoal:new FormControl('',[Validators.required]),
    createDate:new FormControl(new Date(Date.now())),
   
  })
  updateGoals:FormGroup=new FormGroup({
    goal1:new FormControl('',[Validators.required]),
    goal2:new FormControl('',[Validators.required]),
    goal3:new FormControl(''),

  })
  clearVisaCardError() {
 
    this.visaNotFound=false;
    this.balanceCheck=false;
    this.expCheck=false;

    this.VisaCard.updateValueAndValidity();
  }
  ngOnInit(): void {
    //refresh2();
     this.charity.getUserCharities(this.user.userId);
     this.categories.GetAllCategories();
    console.log(this.categories.categories);

    this.charity.getVisaCard();

    
  }


  DeleteDialog(id:number){
    const dialogRef= this.dialog.open(this.deleteDialog) ;
    dialogRef.afterClosed().subscribe((result)=>{
      if(result!=undefined)
      {
      debugger
        if(result=='yes'){
         
          this.charity.DeleteCharity(id);
        }
      }
    })
  }
  openCreateDialog(){
    this.dialog.open(CreateCharityComponent) ;
   }
  openUpdateDialog(body:any){
    debugger
    this.selectCharity=body;
    this.charity.getGoals(body.charityId);
    this.goals=this.charity.goals;
    console.log(this.goals);
    console.log(this.selectCharity);
    this.dialog.open(this.updateCharity) ;
   }


     PayDialog(body:any){
  
        const dialogRef= this.dialog.open(this.payDialog) ;
        this.selectCharity = body;
    }

    uploadImage(file:any){
      if(file.length==0)
        return ;
      let fileToUpload = <File> file[0] ;
      const formData = new FormData();
      formData.append('file',fileToUpload,fileToUpload.name);
      this.charity.UploadAttachment(formData);
    }
  customOptions: OwlOptions = {
    
    center: true,
      items: 1,
      loop: false,
      stagePadding: 0,
      margin: 30,
      dots:true,
      autoWidth:false,
      responsive: {
        0: { items: 1, margin: 10 }, // Adjust margin and items as needed for different screen sizes
    480: { items: 1, margin: 20 },
    600: { items: 2, margin: 20 },
    991: { items: 3, margin: 20 },
    1200: { items: 4, margin: 30 } 
    }
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
        
          this.charity.updateChrity(body);
        }
       
        else if(result=='reject')
        {
         
          this.charity.updateChrity(body);
        }
        else if(result=='delete')
        this.charity.DeleteCharity(body.charityId);
    
      }
    })
  }
}
