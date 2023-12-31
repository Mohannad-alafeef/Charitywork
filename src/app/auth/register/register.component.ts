
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Const } from 'src/app/shared/Const';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit{
  ngOnInit(): void {
    this.auth.getAllAccount();
   
  }
  CreateAccountForm: FormGroup;
  fnChanged=false;
  lnChanged=false;
  dobChanged=false;
  adChanged=false;
  genChanged=false;
  unChanged=false;
  passChanged=false;
  emailChanged=false;
  phoneChanged=false;
  

  Genders = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
  ];

  loginData: any = {};
  personalData: any = {};

  genderImages: any = {
    male: './assets/Images/Male.png',
    female: './assets/Images/Female.png',
  };
  isFormSubmitted = false;

  constructor(private fb: FormBuilder, public auth: AuthService) {
    this.CreateAccountForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
      Address: ['', Validators.required],
      Gender: ['', Validators.required],
      UserName: ['', Validators.required],
      Password: ['',[Validators.required,Validators.minLength(8)]],
      Email: ['',[Validators.required,Validators.email]],
      Phone: ['', [Validators.required,Validators.pattern('^[0-9]{10}$')]],
      ImagePath: [''],
      loginId: [''],
    });
  }
record:any=[{}];
emailcheck:any=false;
userNameCheck:any=false;

checkEmailInRecords(records: any) {
  debugger;
  const emailToCheck = this.CreateAccountForm.value.Email.toLowerCase();
  for (const record of records) {
      if (record.email.toLowerCase() === emailToCheck) {
          this.emailcheck = true;
      }
      if (record.userName === this.CreateAccountForm.value.UserName) {
          this.userNameCheck = true;
      }
  }
  if (this.userNameCheck || this.emailcheck) {
      return true;
  } else {
      return false;
  }
}


  CreateAccountBtn() {

debugger;
    this.record=this.auth.account;

    if(this.checkEmailInRecords(this.record))
    {
      console.log("this email is exist");
      if(this.emailcheck){
         this.CreateAccountForm.controls['Email'].setErrors({emailExist:true});
         this.emailcheck=false;
      }
      if(this.userNameCheck){
         this.CreateAccountForm.controls['UserName'].setErrors({userNameExist:true});
         this.userNameCheck=false;
      }
    }
    else
    {
      this.isFormSubmitted = true;
    
      if (!this.CreateAccountForm.valid) {
        return; 
      }
      else if (!this.CreateAccountForm.value.ImagePath) {
        const selectedGender = this.CreateAccountForm.value.Gender;
        this.CreateAccountForm.value.ImagePath =
          this.genderImages[selectedGender] || this.genderImages.default;
      }
        const selectedGender = this.CreateAccountForm.value.Gender;
        let image:string = this.genderImages[selectedGender] || this.genderImages.male;
        this.personalData.imagePath = image.slice(image.lastIndexOf('/')+1);

      

      this.loginData.userName = this.CreateAccountForm.value.UserName;
      this.loginData.password = this.CreateAccountForm.value.Password;
      this.loginData.email = this.CreateAccountForm.value.Email;
      this.loginData.roleId = Const.User;
      this.personalData.firstName = this.CreateAccountForm.value.FirstName;
      this.personalData.lastName = this.CreateAccountForm.value.LastName;
      this.personalData.dateOfBirth = this.CreateAccountForm.value.DateOfBirth;
      this.personalData.address = this.CreateAccountForm.value.Address;
      this.personalData.gender = this.CreateAccountForm.value.Gender;
      this.personalData.phone = this.CreateAccountForm.value.Phone;
      this.personalData.email = this.CreateAccountForm.value.Email;
      this.personalData.loginDate = new Date().toISOString();

      // Assign imagePath based on selected gender
      
        
      this.auth.register(this.loginData,this.personalData);
  }
}
}
