import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HomeService } from 'src/app/services/home.service';
declare function refresh(): any;
declare function swiper(): any;
declare function counter(): any;
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit,AfterViewInit {
  testOption:OwlOptions = {
    items: 3,
    margin: 10,
    dots: false,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    center: true,
    nav: true,
    navText:[
        '<span class="ion-md-arrow-back">',
        '<span class="ion-md-arrow-forward">',
      ],
  }

  customOptions: OwlOptions = {
    
    center: true,
      items: 1,
      loop: false,
      stagePadding: 0,
      margin: 30,
      nav: true,
      dots:false,
      navText: [
        '<span class="ion-md-arrow-back">',
        '<span class="ion-md-arrow-forward">',
      ],
      responsive: {
        600: {
          stagePadding: 0,
          items: 1,
        },
        800: {
          stagePadding: 0,
          items: 2,
        },
        1000: {
          stagePadding: 300,
          items: 3,
        },
      },
  }
  contactForm:FormGroup=new FormGroup({
    senderName: new FormControl(null,[Validators.required]),
  senderEmail: new FormControl(null,[Validators.required,Validators.email]),
  contactSubject: new FormControl(null,[Validators.required]),
  contactContent: new FormControl(null,[Validators.required]),
  });
  constructor(public home:HomeService){

  }
  ngAfterViewInit(): void {
    counter();
  }
  getTotalPayment(payments:any[]):number{
    return payments.map(x=>x.amount).reduce((sum,el)=>sum +=el,0)
  }
  calcPercent(payments:any[],goal:number):number{
    let total = this.getTotalPayment(payments)
    return (total/goal)*100;
  }
  ngOnInit(): void {
    refresh();
    swiper();
    
    
  }
  sendMessage(){
    console.log(this.contactForm.value);
    this.home.sendMessage(this.contactForm.value)
  }
  nError:boolean|undefined = true;
  sError:boolean|undefined = true;
  cError:boolean|undefined = true;
  eError:boolean|undefined = true;
  nameError(){
    this.nError = this.contactForm.get('senderName')?.hasError('required')
    console.log(this.nError);
    
  }
  subjectError(){
    this.sError = this.contactForm.get('contactSubject')?.hasError('required');
    console.log(this.sError);
    
  }
  contentError(){
    this.cError =this.contactForm.get('contactContent')?.hasError('required');
    console.log(this.cError);
    
  }
  emailError(){
    this.eError = this.contactForm.get('senderEmail')?.hasError('required')||this.contactForm.get('senderEmail')?.hasError('email');
    console.log(this.eError);
    
  }
}
