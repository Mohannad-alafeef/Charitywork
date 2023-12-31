import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authorizationGuard } from './authorization.guard';

const routes: Routes = [

 
  {
    //http://localhost:4200/
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path:'auth',
    loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)
    
  },{
    path:'admin',
    loadChildren:()=>import('./admin/admin.module').then(module=>module.AdminModule),
    canActivate:[authorizationGuard]
  },
  {
    path:'user',
    loadChildren:()=>import('./user/user.module').then(module=>module.UserModule),
    canActivate:[authorizationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
