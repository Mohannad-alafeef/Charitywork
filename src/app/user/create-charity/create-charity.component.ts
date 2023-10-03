import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { CharityService } from 'src/app/services/charity.service';
import { MatStepper } from '@angular/material/stepper';
import maplibregl, { LngLat, Map, Marker } from 'maplibre-gl';
import { NgxSpinnerModule } from 'ngx-spinner'; 
@Component({
  selector: 'app-create-charity',
  templateUrl: './create-charity.component.html',
  styleUrls: ['./create-charity.component.css']
})
export class CreateCharityComponent implements OnInit{
user:any={};
  constructor (public charity:CharityService,public categories:CategoriesService){
  
  }

  ngOnInit(): void {
    debugger
    this.categories.GetAllCategories();
   
    console.log(this.categories.categories);
   
  }

  createCharity:FormGroup=new FormGroup({
  categoryId:new FormControl('',[Validators.required]),
  charityName:new FormControl('',[Validators.required]),
  mission:new FormControl('',[Validators.required]),
  latitude:new FormControl(''),
  longitude:new FormControl(''),
  imagePath:new FormControl('',[Validators.required]),
  donationGoal:new FormControl('',[Validators.required]),
  createDate:new FormControl(new Date(Date.now())),
 
})

  createGoals:FormGroup=new FormGroup({
    goal1:new FormControl('',[Validators.required]),
    goal2:new FormControl('',[Validators.required]),
    goal3:new FormControl(''),

  })
  locationChosen=false;
  mapRef!: Map;
  mapLoaded(map: Map) {
    this.mapRef = map;
 
  }
  choseLocation(event:any){
    console.log(event);
    this.createCharity.value.latitude=event.lngLat.lat.toString();
    this.createCharity.value.longitude=event.lngLat.lng.toString();
    this.locationChosen=true;
    console.log(this.createCharity.value.latitude);
    console.log(this.createCharity.value.longitude);

  }
  saveCharity()
  {
   
    console.log(this.user);
    console.log(this.createCharity.value);
    this.charity.CreateCharity(this.createCharity.value,this.createGoals.value);
    
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
