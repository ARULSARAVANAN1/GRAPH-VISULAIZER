import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthserviceService } from '../service/authservice.service';

export const authguardGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const status = sessionStorage.getItem('IsLoggedIn');
  if(status == "true") {
    return true;
  }
  else {
    router.navigate(['/login']);
    return false;
  }
  
};


