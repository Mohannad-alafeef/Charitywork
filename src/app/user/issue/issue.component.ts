import { IssueService } from './../../services/issue.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl,FormBuilder} from '@angular/forms';

declare function refresh(): any;

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})

export class IssueComponent implements OnInit {
  user :any={} ;
  CreateIssueForm:FormGroup;

  constructor(private fb: FormBuilder,public IssueS:IssueService)
  {
  const userString = localStorage.getItem('user');
  if (userString) {
    this.user = JSON.parse(userString);
  }

  this.CreateIssueForm= this.fb.group({
    userName : new FormControl(''),
    email:new FormControl(''),
    subject: new FormControl(''),
    message:new FormControl(''),
    reportDate :new FormControl(new Date()),
    userId:[this.user.userId],
    })
}
  

    
  ngOnInit(): void {
    refresh();
  }

 sendIssue(body:any)
 {
  this.IssueS.CreateIssue(body);
 }

}
