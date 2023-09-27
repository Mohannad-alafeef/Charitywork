import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categories:any =[{}]
  display_image:any;
  //Constructor
  constructor(private http :HttpClient,private spinner :NgxSpinnerService,private toastr: ToastrService) { }
  //Functions 
  GetAllCategories()
  {
    this.http.get('https://localhost:7081/api/Category/GetAllCategory').subscribe((resp:any)=>{this.categories=resp;
    console.log(resp);
    
    },
    err=>{
      this.toastr.error('Error', err.status);  
    })
  }


  
  DeleteCategory(id:number)
  {
    this.http.delete('https://localhost:7081/api/Category/deleteCategory/'+id).subscribe((resp:any)=>
    {
      this.toastr.success('Success'); 
    },
    err=>{
      this.toastr.error('Error', err.status); 
    })
    window.location.reload();
  }
  
  CreateCategory(body: any) {
    // debugger
    body.imagePath=this.display_image;
    this.spinner.show();
    this.http.post('https://localhost:7081/api/Category/CreateCategory',body).subscribe((resp: any) =>
    {
      this.spinner.hide();
      this.toastr.success('Success'); 
    }, err => {
      this.toastr.error('Error', err.status); 
    })
    
    window.location.reload();
  }

  UpdateCategory(body:any){
    body.imagePath=this.display_image;
    this.spinner.show();
    this.http.put('https://localhost:7081/api/Category/UpdateCategory',body).subscribe((resp: any) =>
    {
      this.spinner.hide();
      this.toastr.success('Success'); 
    },err=>
    {
      this.toastr.error('Error', err.status); 
    })
  }

  UploadAttachment(file: FormData) {
    
    this.http.post('https://localhost:7081/api/Category/UploadImage',file).subscribe((resp:any)=>{
      this.display_image= resp.imagePath; 
      console.log(resp);
      this.toastr.success('Success'); 
    },err=>{
      //alert('somthing wrong');
      this.toastr.error('Error', err.status); 
    });
    }
}

