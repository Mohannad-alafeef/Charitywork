import { Component, OnInit, ViewChild, TemplateRef  } from '@angular/core';
import { CategoriesService } from './../../services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare function refresh2(): any;

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})

export class ManageCategoriesComponent implements OnInit {
  constructor(public CategoryS: CategoriesService, public dialog: MatDialog) {}

  updateCategoryForm :FormGroup = new FormGroup
    ({
    categoryName : new FormControl(''),
    imagePath:new FormControl('')
    })

    createCategoryForm :FormGroup = new FormGroup
    ({
    categoryName : new FormControl(''),
    imagePath:new FormControl('')
    })

  previous_data:any={};

  ngOnInit(): void {
    refresh2();
    this.CategoryS.GetAllCategories();
  }
  
  openDeleteDialog(id:number)
  { 
    const dialogRef= this.dialog.open(this.callDeleteDialog);
    dialogRef.afterClosed().subscribe
    ((result)=>
    {
      if(result!=undefined)
      {
        if (result=="Yes") 
          this.CategoryS.DeleteCategory(id); 
        else if (result=="No") 
          console.log('Thank You'); 
      }
   })
 }


  openUpdateDialog(body:any)
  {
    this.previous_data=body;
    const dialogRef =this.dialog.open(this.callUpdateDialog);
    dialogRef.afterClosed().subscribe
    ((result)=>
    {
      if(result!=undefined)
      {
        if (result=="Update") 
        this.CategoryS.UpdateCategory(body);
        else if (result=="cancel") 
          console.log('Thank You'); 
      }
   })
  }

  openCreateDialog()
  {
    const dialogRef =this.dialog.open(this.callCreateDialog);
    dialogRef.afterClosed().subscribe
    ((result)=>
    {
      if(result!=undefined)
      {
        if (result=="Create") 
        this.CategoryS.CreateCategory(this.createCategoryForm.value);
        else if (result=="cancel") 
          console.log('Thank You'); 
      }
   })
  }

 UploadImage(file:any){
  if(file.length==0)
  return ; 
  let fileToUpload = <File> file[0] ; 
  const formData = new FormData(); 
  formData.append('file',fileToUpload,fileToUpload.name); 
  this.CategoryS.UploadAttachment(formData);
}

  @ViewChild('callDeleteDialog') callDeleteDialog !: TemplateRef <any>
  @ViewChild('callUpdateDialog') callUpdateDialog !: TemplateRef <any>
  @ViewChild('callCreateDialog') callCreateDialog!: TemplateRef<any>

}
