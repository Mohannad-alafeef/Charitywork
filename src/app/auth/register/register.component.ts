
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Const } from 'src/app/shared/Const';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  CreateAccountForm: FormGroup;

  Genders = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
  ];

  loginData: any = {};
  personalData: any = {};

  genderImages: any = {
    male: './assets/assetsTwo/images/Male.png',
    female: './assets/assetsTwo/images/Female.png',
  };

  constructor(private fb: FormBuilder, public auth: AuthService) {
    this.CreateAccountForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
      Address: ['', Validators.required],
      Gender: ['', Validators.required],
      UserName: ['', Validators.required],
      Password: ['', Validators.required],
      Email: ['', Validators.required],
      Phone: ['', Validators.required],
      ImagePath: [''],
      loginId: [''],
    },{updateOn: 'submit'}
    );
  }

  showAdditionalData = false;
  showPersonalData = true;
  
  showPersonalDataSection ()
  {this.showPersonalData = true; 
  this.showAdditionalData = false;
  }

  showAdditionalDataSection() {
    this.showPersonalData = false; // Hide Personal Data section
    this.showAdditionalData = true; // Show Additional Data section
  }

  CreateAccountBtn() {
    debugger
    if (!this.CreateAccountForm.value.ImagePath) {
      const selectedGender = this.CreateAccountForm.value.Gender;
      this.CreateAccountForm.value.ImagePath =
        this.genderImages[selectedGender] || this.genderImages.default;
    }

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

    // Assign imagePath based on selected gender
    const selectedGender = this.CreateAccountForm.value.Gender;
    this.personalData.imagePath =
      this.genderImages[selectedGender] || this.genderImages.male;
      let form = new FormData();
      
    this.auth.register(this.loginData,this.personalData);

    //  if(this.auth.CreateLogin(this.loginData))
    //  {
    //     this.personalData.firstName = this.CreateAccountForm.value.FirstName;
    //     this.personalData.lastName = this.CreateAccountForm.value.LastName;
    //     this.personalData.dateOfBirth = this.CreateAccountForm.value.DateOfBirth;
    //     this.personalData.address = this.CreateAccountForm.value.Address;
    //     this.personalData.gender = this.CreateAccountForm.value.Gender;
    //     this.personalData.phone = this.CreateAccountForm.value.Phone;
    //     this.personalData.email = this.CreateAccountForm.value.Email;

    //     // Assign imagePath based on selected gender
    //     const selectedGender = this.CreateAccountForm.value.Gender;
    //     this.personalData.imagePath = this.genderImages[selectedGender] || this.genderImages.male;

    //     console.log(this.personalData);

    //     this.auth.CreateAccount(this.personalData);
    //   }
  }
}
