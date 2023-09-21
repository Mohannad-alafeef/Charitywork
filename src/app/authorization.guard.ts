import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Const } from './shared/Const';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const toaster:ToastrService = inject(ToastrService);
  const router:Router= new Router();
  debugger
  const token=localStorage.getItem('token');
  if(token)
  {
  if(state.url.indexOf('admin')>=0)
  {
  let user : any =localStorage.getItem('user');
  user=JSON.parse(user);
  if(user.roleId==Const.Admin)
  {
  toaster.success('Welcome on Admin Dashbord')
  return true;
  }else {
    toaster.warning('this page for admin');
    router.navigate(['admin']);
    return false;
    }
    }
    console.log(state);
    return true;
    }
    else {
    router.navigate(['auth/login']);
    toaster.warning('You are not Authorized');
    return false;
    }
    }
