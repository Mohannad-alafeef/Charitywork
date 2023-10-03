import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ManageTestimonialComponent } from './manage-testimonial/manage-testimonial.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CreateCharityComponent } from './create-charity/create-charity.component';
import { ProfileComponent } from './profile/profile.component';
import { ManageWalletComponent } from './manage-wallet/manage-wallet.component';
import { UserCharitiesComponent } from './user-charities/user-charities.component';
import { UpdateCharityComponent } from './update-charity/update-charity.component';
import { IssueComponent } from './issue/issue.component';
import { AllCharitiesComponent } from './all-charities/all-charities.component';
import { CardViewComponent } from './card-view/card-view.component';
import { MapViewComponent } from './map-view/map-view.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    ManageTestimonialComponent,
    CreateCharityComponent,
    ProfileComponent,
    ManageWalletComponent,
    UserCharitiesComponent,
    UpdateCharityComponent,
    IssueComponent,
    AllCharitiesComponent,
    CardViewComponent,
    MapViewComponent,
    PaymentComponent,
  ],
  imports: [CommonModule, UserRoutingModule, SharedModule, CarouselModule],
})
export class UserModule {}
