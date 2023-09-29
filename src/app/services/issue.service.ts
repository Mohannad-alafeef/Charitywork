import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(private http: HttpClient,private toastr:ToastrService, private router: Router) {}

  CreateIssue(body: any) {
     debugger
    this.http.post('https://localhost:7081/api/IssuesReport/CreateIssue',body).subscribe((resp: any) =>
    {
      this.toastr.success('Success'); 
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }, err => {
      this.toastr.error('Error', err.status); 
    })

  }
}
