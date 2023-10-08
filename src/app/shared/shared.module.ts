import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxApexchartsModule } from 'ngx-apexcharts';
import { NgChartsModule } from 'ng2-charts';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule}from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import {MatCardModule} from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataTablesModule } from 'angular-datatables';
import {MatStepperModule} from '@angular/material/stepper';
import { CharityFilterPipe } from '../pipes/charity-filter.pipe';
import { TestimonialFilterPipe } from '../pipes/testimonial-filter.pipe';
import {MatTabsModule} from '@angular/material/tabs'; 
import { GoogleMapsModule } from '@angular/google-maps';
import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from '../pipes/search.pipe';
import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    AdminSidebarComponent,
    UserSidebarComponent,
    CharityFilterPipe,
    TestimonialFilterPipe,
    SearchPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxApexchartsModule,
    NgChartsModule,
    FontAwesomeModule,
    DataTablesModule,
    MatTabsModule,
    GoogleMapsModule,
    NgxMapLibreGLModule,
    NgxPaginationModule,
    MatSnackBarModule
  ],
  exports:
  [
    NavbarComponent,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    AdminSidebarComponent,
    NgxApexchartsModule,
    NgChartsModule,
    UserSidebarComponent,
    MatCardModule,
    FontAwesomeModule,
    MatStepperModule,
    CharityFilterPipe,
    DataTablesModule,
    TestimonialFilterPipe,
    MatTabsModule,
    GoogleMapsModule,
    NgxMapLibreGLModule,
    NgxPaginationModule,
    SearchPipe,
    MatSnackBarModule
  ],

  
})
export class SharedModule { }
