import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {SessionService} from '../services/local/session.service';

export const authGuard: CanActivateFn = (route, state) => {
  const sessionService: SessionService = inject(SessionService);
  const router: Router = inject(Router);

  if (sessionService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};
