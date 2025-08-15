import {Routes} from '@angular/router';
import {authGuard} from './guards/auth-guard';

export const routes: Routes = [
  {path: '', redirectTo: 'notes', pathMatch: 'full'},
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(m => m.Login),
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/register/register').then(m => m.Register),
      }
    ]
  },
  {
    path: 'notes',
    loadComponent: () => import('./pages/dashboard/dashboard')
      .then(m => m.Dashboard),
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found')
      .then(m => m.NotFound),
  }
];
