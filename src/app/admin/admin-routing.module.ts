import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageCharityComponent } from './manage-charity/manage-charity.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
  },
  {
    path:'charity',
    component:ManageCharityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
