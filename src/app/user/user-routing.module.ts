import { IssueComponent } from './issue/issue.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageTestimonialComponent } from './manage-testimonial/manage-testimonial.component';
import { ProfileComponent } from './profile/profile.component';
import { ManageWalletComponent } from './manage-wallet/manage-wallet.component';
import { UserCharitiesComponent } from './user-charities/user-charities.component';
import { AllCharitiesComponent } from './all-charities/all-charities.component';
import { MapViewComponent } from './map-view/map-view.component';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'managetestimonial',
    component: ManageTestimonialComponent,
  },
  {
    path: 'managewallet',
    component: ManageWalletComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'MyCharities',
    component: UserCharitiesComponent,
  },
  {
    path: 'issue',
    component: IssueComponent,
  },
  {
    path: 'charities',
    component: AllCharitiesComponent,
  },
  {
    path: 'issue',
    component: IssueComponent,
  },
  {
    path: 'charities',
    component: AllCharitiesComponent,
  },
  {
    path: 'map',
    component: MapViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
