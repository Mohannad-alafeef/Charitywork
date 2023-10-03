import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ToastrModule, ToastNoAnimation,ToastNoAnimationModule}from 'ngx-toastr'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/Interceptor/token.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';





@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
     BrowserModule,
     BrowserAnimationsModule,
     ToastrModule.forRoot(),
    ToastNoAnimation,
    ToastNoAnimationModule.forRoot(),
     AppRoutingModule, 
     SharedModule, 
     FormsModule,
     AuthModule,
     HttpClientModule,
     NgxSpinnerModule,
     FontAwesomeModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor, 
      multi:true
    }
  ],
  bootstrap: [AppComponent],

})
export class AppModule {}
