import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from "../shared/shared.module";
import { ManageTestimonialComponent } from './manage-testimonial/manage-testimonial.component';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
    declarations: 
    [
        DashboardComponent,
        ManageTestimonialComponent,
        
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        SharedModule,
        CarouselModule
    ]
})
export class UserModule { }
