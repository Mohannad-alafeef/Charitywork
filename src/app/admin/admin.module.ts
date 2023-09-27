import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ManageCharityComponent } from './manage-charity/manage-charity.component';
import { Const } from '../shared/Const';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { ContactComponent } from './contact/contact.component';
import { ManagePagesComponent } from './manage-pages/manage-pages.component';
import {Component} from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ManageCharityComponent,
    ManageCategoriesComponent,
    ContactComponent,
    ManagePagesComponent,
    ProfileComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
