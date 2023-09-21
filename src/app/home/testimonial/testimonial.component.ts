import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HomeService } from 'src/app/services/home.service';

declare function refresh(): any;
@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css'],
})
export class TestimonialComponent implements OnInit {
  testOption: OwlOptions = {
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
  };
  constructor(public home: HomeService) {}
  ngOnInit(): void {
    refresh();
  }
}
