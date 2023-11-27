import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const signupGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const status = sessionStorage.getItem('IsLoggedIn');
  
  if(status == "true") {
    router.navigate(['/user/home']);
    return false;
  }
  return true;
};
