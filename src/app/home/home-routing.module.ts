import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUSComponent } from './about-us/about-us.component';
import { TestimonialComponent } from './testimonial/testimonial.component';

const routes: Routes = [
  {
    path:'',
    component:HomePageComponent
  },
  {
    path:'contact',
    component:ContactUsComponent
  },
  {
    path:'about',
    component:AboutUSComponent
  },
  {
    path:'testimonial',
    component:TestimonialComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
