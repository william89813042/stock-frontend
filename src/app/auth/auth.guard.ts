import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const targetUrl = state.url;
  const routeCode = route.data['code'];

  console.log('@@@ checkAuth targetUrl:', targetUrl);

  if (!authService.storageStatus() || !authService.loginStatus()) {
    console.log('@@@ checkAuth no pass . . .');
    authService.logout();
    return router.createUrlTree(['/login']);
  }

  if (authService.getCurrentUserIsChange() === false) {
    console.log('@@@ checkAuth no pass . . .');
    return router.createUrlTree(['/changePd']);
  }

  return (
    //用戶嘗試導航到沒有權限的路由，會將用戶重定向到 '404' 路由
    authService.checkPermission(routeCode) || router.createUrlTree(['404'])
  );
};

export const changeGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.storageStatus() || !authService.loginStatus()) {
    console.log('@@@ checkAuth no pass . . .');
    authService.logout();
    return router.createUrlTree(['/login']);
  }

  if (authService.getCurrentUserIsChange() === false) {
    return true;
  }

  return router.createUrlTree(['/manage/welcome']);
};
