import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}
  Login(email: any, password: any) {
    var body = {
      username: email.value.toString(),
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
          localStorage.setItem('token', responce.token);

          let data: any = jwt_decode(responce.token);
          localStorage.setItem('user', JSON.stringify(data));
          debugger;
          if (data.roleId == '1') {
            this.toastr.success('Welcome On Admin Dashbaord');
            this.router.navigate(['home/about']);
          } else if (data.roleId == '2') {
            this.toastr.success('Welcome On Courses Page');
            this.router.navigate(['home/contact']);
          }
        },
        (err) => {
          console.log(err);
          this.toastr.error('Something wrong!!');
          this.toastr.error(err.message);
        }
      );
  }
  loginId: any;
  async register(loginData: any,personalData:any) {
    //debugger

    let userLogin = new Promise((resolve,reject)=>{
      this.http
      .post('https://localhost:7081/api/login/createLogin', loginData)
      .subscribe(
        (resp: any) => {
          personalData.loginId = resp
          resolve(personalData)
          // this.loginId = resp.loginId;
          // //alert(' Success');
          // this.toastr.success('Success');
        },
        (err) => {
          //alert('somthing wrong');
          console.log(err.status);
          this.toastr.error('Error', err.status);
        }
      );
    })
    userLogin.then(v=>{
      this.createAccount(v);
      
    });
     
      
    //window.location.reload();
    return true;
  }

  createAccount(body: any) {
    // debugger
    
    body.loginId = this.loginId;
    this.http.post('https://localhost:7081/api/Account', body).subscribe(
      (resp: any) => {
        // console.log(resp);
        //alert(' Success');
        this.toastr.success('Success');
      },
      (err) => {
        // alert('somthing wrong');
        console.log(err.status);
        this.toastr.error('Error', err.status);
      }
    );

    //window.location.reload();
  }
}
