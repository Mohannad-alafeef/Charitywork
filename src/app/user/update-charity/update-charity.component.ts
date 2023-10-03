import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { CharityService } from 'src/app/services/charity.service';
import maplibregl, { LngLat, Map, Marker } from 'maplibre-gl';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-charity',
  templateUrl: './update-charity.component.html',
  styleUrls: ['./update-charity.component.css']
})
export class UpdateCharityComponent {
  constructor (public charity:CharityService,public categories:CategoriesService,public spin : NgxSpinnerService,public t:ToastrService){
  
  }
  ngOnInit(): void {
    debugger
    this.categories.GetAllCategories();
  

 console.log(this.selectCharity.latitude);
 console.log(this.selectCharity.longitude);
  }
  @Input() selectCharity:any={};
  @Input() selectGoals:any=[{}];


  updateCharity:FormGroup=new FormGroup({
    categoryId:new FormControl('',[Validators.required]),
    charityName:new FormControl('',[Validators.required]),
    mission:new FormControl('',[Validators.required]),
    latitude:new FormControl(''),
    longitude:new FormControl(''),
    imagePath:new FormControl(''),
    donationGoal:new FormControl('',[Validators.required]),
    createDate:new FormControl(new Date(Date.now())),
   
  })
  
    updateGoals:FormGroup=new FormGroup({
      goal1:new FormControl('',[Validators.required]),
      goal2:new FormControl('',[Validators.required]),
      goal3:new FormControl(''),
  
    })
  
    mapRef!: Map;
    mapLoaded(map: Map) {
      this.mapRef = map;
   
    }
    choseLocation(event:any){
      console.log(event);
      this.updateCharity.value.latitude=event.lngLat.lat.toString();
      this.updateCharity.value.longitude=event.lngLat.lng.toString();

      this.selectCharity.latitude=event.lngLat.lat.toString();
      this.selectCharity.longitude=event.lngLat.lng.toString();
      
      
      console.log(this.updateCharity.value.latitude);
      console.log(this.updateCharity.value.longitude);
    }
  UpdateCharity()
  {
   // debugger
    if(this.updateCharity.value.imagePath=='')  
        this.updateCharity.value.imagePath=this.selectCharity.imagePath;
  
 // debugger
    //  console.log(this.selectGoals[0]);
    //  console.log(this.updateCharity.value);
    this.spin.show();
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
