import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { NgxApexchartsModule } from 'ngx-apexcharts';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    AdminSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxApexchartsModule,
    NgChartsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports:
  [
    NavbarComponent,
    FooterComponent,
    FormsModule,
    AdminSidebarComponent,
    NgxApexchartsModule,
    NgChartsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],

  
})
export class SharedModule { }
