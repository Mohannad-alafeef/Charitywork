import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageTestimonialComponent } from './manage-testimonial/manage-testimonial.component';
import { ProfileComponent } from './profile/profile.component';
import { ManageWalletComponent } from './manage-wallet/manage-wallet.component';
const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
  },
  {
    path:'managetestimonial',
    component:ManageTestimonialComponent
  }  ,
  {
  path:'profile',
  component:ProfileComponent
},
 {
  path:'managewallet',
  component:ManageWalletComponent
}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
