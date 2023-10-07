import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Const } from '../shared/Const';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

account:any=[{}];
  getAllAccount()
  {
    debugger
    this.http.get('https://localhost:7081/api/Login/GetAllLogin').subscribe(
        (resp: any) => {
          this.account=resp;
          //console.log(this.account);
        },(err) => {
          //alert('somthing wrong');
          console.log(err.status);
          this.toastr.error('Error', err.status);
        })
  }

  Login(email: any, password: any) {
    var body = {
      email: email.value.toString(),
      password: password.value.toString(),
    };

    const headerDirc = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDirc),
    };

    this.http
      .post('https://localhost:7081/api/Login/Auth', body, requestOptions)
      .subscribe(
        (resp: any) => {
          console.log(resp); //token
          const responce = {
            token: resp.toString(), //save on localstorge
          };
          localStorage.clear();
          localStorage.setItem('token', responce.token);
          let data: any = jwt_decode(responce.token);
          localStorage.setItem('user', JSON.stringify(data));

          debugger;

          if (data.roleId == Const.Admin) {
           // this.toastr.success('Welcome On Admin Dashbaord');
            this.router.navigate(['admin']);
          } else if (data.roleId == Const.User) {
          //  this.toastr.success('Welcome On User Dashbaord');
            this.router.navigate(['user']);
          }
        },
        (err) => {
          this.toastr.error('invalid email , User Name or password ');
          
        }
      );
  }
  loginId: any;
  async register(loginData: any,personalData:any) {
    //debugger
   // console.log(loginData);
    
    let userLogin = new Promise((resolve,reject)=>{
      this.http
      .post('https://localhost:7081/api/login/createLogin', loginData)
      .subscribe(
        (resp: any) => {
          debugger;
          personalData.loginId = resp;
          console.log(resp);
          
          resolve(personalData)
          // this.loginId = resp.loginId;
          // //alert(' Success');
          // this.toastr.success('Success');
        },
        (err) => {
          //alert('somthing wrong');
          console.log(err.status);
         // this.toastr.error('Error', err.status);
        }
      );
    })
    await userLogin.then(v=>{
      console.log(v);
      
      this.createAccount(v);
      
    });
     
      
    //window.location.reload();
    return true;
  }

  createAccount(body: any) {
    //debugger
    
    this.http.post('https://localhost:7081/api/Account', body).subscribe(
      (resp: any) => {
        // console.log(resp);
        //alert(' Success');
        this.toastr.success('Success').onHidden.subscribe({
          next:()=>{
            this.router.navigate(['auth/login'])
          }
        });
      },
      (err) => {
        // alert('somthing wrong');
        console.log(err.status);
        //this.toastr.error('Error', err.status);
      }
    );

    //window.location.reload();
  }
}
