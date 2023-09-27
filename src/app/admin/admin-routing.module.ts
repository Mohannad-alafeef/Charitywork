import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageCharityComponent } from './manage-charity/manage-charity.component';
import { ContactComponent } from './contact/contact.component';
import { ManagePagesComponent } from './manage-pages/manage-pages.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
  },
  {
    path:'charity',
    component:ManageCharityComponent
  },
  {
    path:'Categories',
    component:ManageCategoriesComponent
  },
    {
    path:'contact',
    component:ContactComponent
  },
  {
    path:'pages',
    component:ManagePagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
