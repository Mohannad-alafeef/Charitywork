import { ManageIssuesComponent } from './manage-issues/manage-issues.component';
import { ProfileComponent } from './profile/profile.component';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageCharityComponent } from './manage-charity/manage-charity.component';
import { ContactComponent } from './contact/contact.component';
import { ManagePagesComponent } from './manage-pages/manage-pages.component';
import { UsersComponent } from './users/users.component';
import { ManageTestimonialsComponent } from './manage-testimonials/manage-testimonials.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'charity',
    component: ManageCharityComponent,
  },
  {
    path: 'categories',
    component: ManageCategoriesComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'pages',
    component: ManagePagesComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'testimonials',
    component: ManageTestimonialsComponent,
  },
  {
    path: 'issues',
    component: ManageIssuesComponent,
  },{
    path:'reports',
    component:ReportsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
