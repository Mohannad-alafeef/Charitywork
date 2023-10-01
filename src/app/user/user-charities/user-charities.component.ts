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
     this.charity.getUserCharities();
     this.categories.GetAllCategories();
    console.log(this.categories.categories);

    this.charity.VisaCardByNmber();

    
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
    pay(){

        ///filter the visaCards
        const dateNow = new Date(Date.now());

        const filteredVisa  = this.charity.Visa.filter((V: any) => {
          const expDate = V.expDate.split('T')[0];
          return V.cardNumber === this.VisaCard.value.CardNumber && V.userId==this.user.userId
           && V.cvv.toString() == this.VisaCard.value.cvv && expDate==this.VisaCard.value.expDate
         });
         console.log("filteredVisa");
         console.log(filteredVisa);
debugger
         if(filteredVisa.length==0)
         {
          this.visaNotFound=true;
       
           this.toaster.warning('sorry Not found VisaCard')
   
         }
         else{
           if(filteredVisa[0].balance < this.constant.PaymntAmount)
             {
                this.balanceCheck=true;
                this.toaster.warning('sorry You Dont Have enough Balance'); 
             }
   
           else if(filteredVisa[0].expDate <= dateNow)
            {
               this.expCheck=true;
               this.toaster.warning('Expired visaCard');
               

            }

   
           else 
           {
              this.paymentBody.paymentType= this.constant.Payment;
              this.paymentBody.paymentDate= new Date(Date.now());
              this.paymentBody.amount=this.constant.PaymntAmount
              this.paymentBody.userId=this.user.userId;
              this.paymentBody.charityId= this.selectCharity.charityId;
              console.log(this.paymentBody);

              this.visaBody.visaId=filteredVisa[0].visaId;
              this.visaBody.CardNumber=filteredVisa[0].cardNumber;
              this.visaBody.balance=filteredVisa[0].balance - this.constant.PaymntAmount;
              this.visaBody.cvv=filteredVisa[0].cvv;
              this.visaBody.expDate=filteredVisa[0].expDate;
              this.visaBody.userId=filteredVisa[0].userId;
              console.log(this.visaBody);
       
              this.selectCharity.isAccepted=this.constant.Posted;
             console.log(this.selectCharity);

             this.charity.ChrityPayment(this.paymentBody);
             this.charity.updateVisaCard(this.visaBody);
             this.charity.updateChrity( this.selectCharity);

           }
           console.log('visacard found');
         }
 


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
