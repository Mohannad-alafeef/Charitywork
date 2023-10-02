import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/services/categories.service';
import { CharityService } from 'src/app/services/charity.service';
import { Const } from 'src/app/shared/Const';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{
  user: any={};
  payment:any={};
  constant=Const;
  balanceCheck:boolean=false;
  expCheck:boolean=false;

  @Input() selectedCharity!:any;
  @Input() DonatePayment :any;

  constructor(public charity:CharityService,public dialog: MatDialog ,private toaster:ToastrService,private router:Router){
    const userString = localStorage.getItem('user');

    if (userString) {
      this.user = JSON.parse(userString);
    }
  }
  
 ngOnInit(): void {
   
  this.charity.getUserVisaCard(this.user.userId);
  this.charity.getUserCharityVisaCard(this.selectedCharity.userId);

  this.charity.getAdminVisaCard();
  console.log(this.charity.Visa);
  console.log('charity',this.selectedCharity);
  if(this.DonatePayment==this.constant.Donation)
  {
    this.pay.controls['amount'].setValidators([Validators.required]);
    this.pay.controls['amount'].updateValueAndValidity();
  
  }
 }

  pay:FormGroup=new FormGroup({
 
    amount:new FormControl(''),
    visaCard:new FormControl('',[Validators.required]),
   
  })
  add(){
    debugger
    this.router.navigate(['user/managewallet']);
  }
  clearVisaCardError() {
 
    this.balanceCheck=false;
    this.expCheck=false;
 
  }
  Pay(){
    console.log("this.selectedVisaCard");
    console.log(this.pay.value.visaCard);
    console.log("amount");
    console.log(this.pay.value.amount);
    const dateNow = new Date(Date.now());
 
     if(this.pay.value.visaCard.balance < this.pay.value.amount)
    {
      this.balanceCheck=true;
        console.log('you dont Have enough balance');
    }
    else if(this.pay.value.visaCard.expDate < dateNow)
    {
        console.log('VisaCard Expired');
        this.expCheck=true;
    }
    else
    {
     
      

     if(this.DonatePayment==this.constant.Donation)
     {
 debugger
      this.payment.amount=this.pay.value.amount;
      this.payment.paymentType=this.constant.Donation;
      this.payment.charityId=this.selectedCharity.charityId;
      this.payment.userId=this.user.userId;
      this.payment.paymnetDate=dateNow;
      this.charity.ChrityPayment(this.payment);
     

      ///user visacard
      console.log('visacard befor',this.pay.value.visaCard);
      this.pay.value.visaCard.balance = this.pay.value.visaCard.balance - this.pay.value.amount;
      console.log('visacard after',this.pay.value.visaCard);
      this.charity.updateVisaCard(this.pay.value.visaCard);


      ///charity visacard
      console.log('paymnet',this.payment);
      console.log('charity visa befor',this.charity.userCharityVisa[0]);
      this.charity.userCharityVisa[0].balance = this.charity.userCharityVisa[0].balance +parseInt( this.pay.value.amount);
      console.log('charity visa after',this.charity.userCharityVisa[0]);
      this.charity.updateVisaCard(this.charity.userCharityVisa[0]);
      
     }
     else if (this.DonatePayment==this.constant.Payment)
     {
      this.payment.amount=this.constant.PaymntAmount;
      this.payment.paymentType=this.constant.Payment;
      this.payment.charityId=this.selectedCharity.charityId;
      this.payment.userId=this.user.userId;
      this.payment.paymnetDate=dateNow;
      this.charity.ChrityPayment(this.payment);
      console.log('paymnet',this.payment);

      //admid visacard
      console.log('admin card beffor',this.charity.AdminCharityVisa[0].balance);
      this.charity.AdminCharityVisa[0].balance=this.charity.AdminCharityVisa[0].balance + this.constant.PaymntAmount;
      console.log('admin card after',this.charity.AdminCharityVisa[0].balance);
      this.charity.updateVisaCard(this.charity.AdminCharityVisa);

      //user visacard
      console.log('visacard beffor',this.pay.value.visaCard);
      this.pay.value.visaCard.balance = this.pay.value.visaCard.balance - this.constant.PaymntAmount;
      console.log('visacard after',this.pay.value.visaCard);
      this.charity.updateVisaCard(this.pay.value.visaCard);

      this.selectedCharity.isAccepted =this.constant.Posted;
      this.charity.updateChrity(this.selectedCharity);

     }

     
 
    }


}

}
