import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/qry0101/qry0101.component').then(m => m.Qry0101Component)
  },
  {
    path: 'add',
    loadComponent: () => import('./components/add0101/add0101.component').then(m => m.Add0101Component)
  },
  {
    path: 'upd',
    loadComponent: () => import('./components/upd0101/upd0101.component').then(m => m.Upd0101Component)
  },
  {
    path: 'view',
    loadComponent: () => import('./components/view0101/view0101.component').then(m => m.View0101Component)
  }
];
