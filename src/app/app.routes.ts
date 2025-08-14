import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'notes', pathMatch: 'full'},
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(m => m.Login),
      }
    ]
  },
];
