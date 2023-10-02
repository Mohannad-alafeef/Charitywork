import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HomeService } from 'src/app/services/home.service';
import { Const } from 'src/app/shared/Const';
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
    autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: false,
        items: 1,
        center: true,
        nav: false,
        margin: 50,
        dots: true,
        loop: true,
        responsive: {
            0: { items: 1,stagePadding:0 },
            480: { items: 1,stagePadding:0 },
            600: { items: 2,stagePadding:0 },
            991: { items: 3,stagePadding:0 },
            1500: { items: 4,stagePadding:100 }
        }
  }

  customOptions: OwlOptions = {
    
    center: true,
      items: 1,
      loop: false,
      stagePadding: 0,
      margin: 30,
      dots:true,
      autoWidth:false,
      responsive: {
        0: { items: 1 },
        480: { items: 1 },
        600: { items: 2 },
        991: { items: 3 },
        1200: { items: 4 }
    }
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
    return payments.filter((x:any)=>x.paymentType == Const.Donation).map(x=>x.amount).reduce((sum,el)=>sum +=el,0)
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
