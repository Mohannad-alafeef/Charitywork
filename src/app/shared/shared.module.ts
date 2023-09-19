import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { NgxApexchartsModule } from 'ngx-apexcharts';
import { NgChartsModule } from 'ng2-charts';


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
    NgChartsModule
  ],
  exports:
  [
    NavbarComponent,
    FooterComponent,
    FormsModule,
    AdminSidebarComponent,
    NgxApexchartsModule,
    NgChartsModule
  
  ]
})
export class SharedModule { }
