import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { CharityService } from 'src/app/services/charity.service';

@Component({
  selector: 'app-update-charity',
  templateUrl: './update-charity.component.html',
  styleUrls: ['./update-charity.component.css']
})
export class UpdateCharityComponent {
  constructor (public charity:CharityService,public categories:CategoriesService){
  
  }
  ngOnInit(): void {
    debugger
    this.categories.GetAllCategories();
 
  }
  @Input() selectCharity:any={};
  @Input() selectGoals:any=[{}];

  updateCharity:FormGroup=new FormGroup({
    categoryId:new FormControl(this.selectCharity.categoryId,[Validators.required]),
    charityName:new FormControl(this.selectCharity.charityName,[Validators.required]),
    mission:new FormControl('',[Validators.required]),
    latitude:new FormControl('00',[Validators.required]),
    longitude:new FormControl('00',[Validators.required]),
    imagePath:new FormControl(''),
    donationGoal:new FormControl('',[Validators.required]),
    createDate:new FormControl(new Date(Date.now())),
   
  })
  
    updateGoals:FormGroup=new FormGroup({
      goal1:new FormControl('',[Validators.required]),
      goal2:new FormControl('',[Validators.required]),
      goal3:new FormControl(''),
  
    })
  UpdateCharity()
  {
    debugger
    if(this.updateCharity.value.imagePath=='')  
        this.updateCharity.value.imagePath=this.selectCharity.imagePath;
  debugger
      console.log(this.selectGoals[0]);
      console.log(this.updateCharity.value);
    this.charity.updateChrityInfo(this.selectCharity,this.selectGoals);
  }

  uploadImage(file:any){
    if(file.length==0)
      return ;
    let fileToUpload = <File> file[0] ;
    const formData = new FormData();
    formData.append('file',fileToUpload,fileToUpload.name);
    this.charity.UploadAttachment(formData);
  }
}
