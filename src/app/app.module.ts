import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import { AboutUSComponent } from './about-us/about-us.component';
import{FormsModule}from'@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AboutUSComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
