import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Const } from '../shared/Const';

@Injectable({
  providedIn: 'root'
})
export class CharityViewService {
  charityObj:any[] = [];

  constructor(private http:HttpClient) { }

  getCharities() {
    this.http.get('https://localhost:7081/api/charity').subscribe({
     next:(res:any)=>{
       res = res.filter((x:any)=>x.isAccepted==Const.Accepted);

       this.charityObj = res.filter((c:any)=>c.payments.at(0)!=null);
    
     }
   });
 }
}
