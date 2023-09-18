import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutUSComponent } from './home/about-us/about-us.component';
import { ContactUsComponent } from './home/contact-us/contact-us.component';
import { HomePageComponent } from './home/home-page/home-page.component';

const routes: Routes = [
  {
    //http://localhost:4200/
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
