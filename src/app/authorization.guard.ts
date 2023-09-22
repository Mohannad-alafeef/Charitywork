import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Const } from './shared/Const';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const toaster: ToastrService = inject(ToastrService);
  const router: Router = new Router();
  const token = localStorage.getItem('token');
  if (token) {
    let user: any = localStorage.getItem('user');
    user = JSON.parse(user);
    if (state.url.indexOf('admin') >= 0) {
      if (user.roleId == Const.Admin) {
       // toaster.success('Welcome on Admin Dashbord');
        router.navigate(['admin']);
        return true;
      } else {
        router.navigate(['auth/login']);
        return false;
      }
    }else if(state.url.indexOf('user')){
      if(user.roleId == Const.User){
        router.navigate(['user']);
        return true;
      }else{
        router.navigate(['auth/login']);
        return false;
      }
    }
    console.log(state);
    return false;
  } else {
    router.navigate(['auth/login']);
    toaster.warning('You are not Authorized');
    return false;
  }
};
