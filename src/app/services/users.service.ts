import { HttpClient } from '@angular/common/http';
import { Injectable, Renderer2 } from '@angular/core';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: Array<any> = [];
  userObservable = new BehaviorSubject<any[]>([]);
  dtOptions: DataTables.Settings = {
    destroy:true,
    pagingType: 'full_numbers',
    search: true,
    autoWidth:true,
    rowCallback:(row,data,index)=>{
    
      row.childNodes[5].addEventListener('click',()=>{
        this.infoCallback(data);
        
      })
      
      return row;
    },
    columnDefs:[
      { className: "table-td-size", targets: "_all" }
    ],
    columns: [
      {
        title: 'First Name',
        data: 'firstName',
        searchable: true,
      },
      {
        title: 'Last Name',
        data: 'lastName',
        searchable: true,
      },
      {
        title: 'User Image',
        data: 'imagePath',
        searchable: false,
        orderable:false,
        render: (data) => {
          return `<img src="../../../assets/Images/${data}" width="70" height="70" style="object-fit:cover; border-radius: 50%;">`;
        },
      },
      {
        title: 'Email',
        data: 'email',
        searchable: true,
      },
      {
        title: 'Phone',
        data: 'phone',
        searchable: false
      },
      {
        title:'',
        data:'userId',
        orderable:false,
        searchable:false,
        render:(data,type,row,meta)=>{
          let btn = document.createElement('button');
          btn.innerText = "Info";
          btn.classList.add("btn","btn-success")
          btn.addEventListener('click',()=>{
            console.log(row);
            
          })
          return btn.outerHTML;
        }
      }
    ],
    pageLength: 50,
  };
  infoCallback!:(data:any)=>void;

  constructor(private http: HttpClient) {
    console.log("serv cons");
    
    this.getAllUsers();
  }
  getAllUsers(){
    this.http.get('https://localhost:7081/api/Account').subscribe({
      next:(res:any)=>{
        console.log("next service");
        
        this.users =  res;
        this.dtOptions.data = this.users;
        this.userObservable.next(this.users);
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}

