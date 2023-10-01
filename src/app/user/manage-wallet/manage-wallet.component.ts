import { AfterViewInit, Component, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder,FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { UserwalletService } from 'src/app/services/userwallet.service';
declare function refresh2(): any;


@Component({
  selector: 'app-manage-wallet',
  templateUrl: './manage-wallet.component.html',
  styleUrls: ['./manage-wallet.component.css']
})
export class ManageWalletComponent   {
  user1 :any={} ;
  userWallet:any={};
  previous_data:any = {  };
  record:any=[{}];
  visacardcheck:any=false;
  dialogRef: any;


  constructor(public wallet:UserwalletService,route : Router,public dialog: MatDialog, private renderer: Renderer2,  private formBuilder: FormBuilder
    ) {
    const userString = localStorage.getItem('user');
    if (userString) {
       this.user1 = JSON.parse(userString);
    }
  }

  // ngAfterViewInit(): void {
  //   this.bindJQueryEvents();
  // }

  CreateWallet: FormGroup = new FormGroup({
    cardNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{16}$/)]),
    cvv: new FormControl('', [Validators.required, Validators.pattern(/^\d{3}$/)]),
    expDate: new FormControl('', [Validators.required, this.futureDateValidator])
}, 
{validators: [this.cardNumberExistValidator]});

  ChargeForm:FormGroup=new FormGroup({
    balance:new FormControl ('', [Validators.required, Validators.min(1)])

  })
  
  
  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const controlValue = new Date(control.value);
    controlValue.setHours(0, 0, 0, 0); // set time to start of the day

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // set time to start of the day

    if (controlValue < currentDate) {
        return { 'notFutureDate': true };
    }
    return null;
}
cardNumberExistValidator(control: AbstractControl): ValidationErrors | null {
  const cardNumberControl = (control as FormGroup).get('cardNumber');
  if (cardNumberControl?.hasError('cardNumberExist')) {
      return { cardNumberExist: true };
  }
  return null;
}


  ngOnInit(): void{
    refresh2();
    this.wallet.getUserWallet();
  }

  deletewalle(id :number){
    const dialogRef= this.dialog.open(this.callDeleteDailog);
     dialogRef.afterClosed().subscribe((result)=>{
   if(result!=undefined)
   {
     if(result=='yes')
     {
       this.wallet.DeleteWallet(id );
     }
     else if(result=='no'){
       console.log("Thank you ");
     }
   }
 })
 }
 OpenCreateWallet()
 {
  this.dialogRef = this.dialog.open(this.callCeateDailog);

 }
 checkvisacardInRecords(records :any) {
    
  debugger;
      for (const record of records) {
        if (record.cardNumber === this.CreateWallet.value.cardNumber) {
          this.visacardcheck = true; 
          
        }   
      }
      if(this.visacardcheck)
        return true;
      else
        return false; 
    }
createWallet(){

  this.record=this.wallet.walletlObj;
  
  if(this.checkvisacardInRecords(this.record))
  {
    console.log("this card Number is exist");
    this.CreateWallet.controls['cardNumber'].setErrors({cardNumberExist:true});
    this.CreateWallet.invalid
    this.visacardcheck=false;
  }
  else{
  this.userWallet.cardNumber=this.CreateWallet.value.cardNumber;
  this.userWallet.cvv=this.CreateWallet.value.cvv;
  this.userWallet.expDate=this.CreateWallet.value.expDate;
  this.userWallet.userId=this.user1.userId;
  this.userWallet.balance=500;
  console.log(this.user1);
  console.log(this.userWallet);

 this.wallet.createtWallet(this.userWallet);
 if (this.dialogRef) {
  this.dialogRef.close();
}
  }
}


//  openChargeDialog(body: any) {
//   const dialogRef = this.dialog.open(this.callUpdateDailog);
//   // console.log('Body:', body);
//   // console.log('Previous Data:', this.previous_data)
//   // console.log(this.ChargeForm.get('balance')?.value)
//   if(this.ChargeForm.get('balance')?.value)
//   {
//   dialogRef.afterClosed().subscribe((result) => {
//       if (result != undefined && result == "Charge" ) {
//         console.log('balance from form',this.ChargeForm.value.balance);
//         console.log('Body balance:', body.balance);

//         body.balance= parseInt(body.balance)+parseInt(this.ChargeForm.value.balance);
//         console.log('Body balance after sum:', body.balance);

//           this.wallet.ChargeWallet(body);
//       } else if (result === "cancel") {
//           console.log('Thank You');
//       }
//   });
// }
// }



@ViewChild ('callDeleteDailog') callDeleteDailog !:TemplateRef<any>
@ViewChild ('callUpdateDailog') callUpdateDailog !:TemplateRef<any>
@ViewChild ('callCeateDailog') callCeateDailog !:TemplateRef<any>

}
