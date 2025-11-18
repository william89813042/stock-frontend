import { Routes } from '@angular/router';
import { authGuard, changeGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'changePd',
    loadComponent: () =>
      import('./changePd/changePd.component').then((m) => m.ChangePdComponent),
    canActivate: [changeGuard],
  },
  {
    path: 'manage',
    loadComponent: () =>
      import('./layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: 'welcome',
        loadComponent: () =>
          import('./pages/welcome/welcome.component').then(
            (m) => m.WelcomeComponent,
          ),
        canActivate: [authGuard],
      },
      {
        path: 'stock-Body0101',
        loadChildren: () =>
          import('./pages/stock-Body0101/entry0101.routes').then(
            (m) => m.routes,
          ),
        canActivate: [authGuard],
        data: { code: '0101' },
      },
    ],
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/page-not-found/page-not-found.component').then(
        (m) => m.PageNotFoundComponent,
      ),
  },
];
