import { ProfileComponent } from './profile/profile.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageCharityComponent } from './manage-charity/manage-charity.component';
import { ContactComponent } from './contact/contact.component';
import { UsersComponent } from './users/users.component';

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
    path:'categories',
    component:ManageCategoriesComponent
  },
    {
    path:'contact',
    component:ContactComponent
  }
  ,
    {
    path:'profile',
    component:ProfileComponent
  },
  {
    path:'users',
    component:UsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
