import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HomeService } from 'src/app/services/home.service';

declare function refresh(): any;
@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {
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
  constructor(public home:HomeService){

  }
  ngOnInit(): void {
    refresh();
  }

}
