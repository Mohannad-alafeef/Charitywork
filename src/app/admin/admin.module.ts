import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ManageCharityComponent } from './manage-charity/manage-charity.component';
import { Const } from '../shared/Const';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ManageCharityComponent,
    ManageCategoriesComponent,
    ContactComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
