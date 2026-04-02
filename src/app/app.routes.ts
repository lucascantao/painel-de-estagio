import { Routes } from '@angular/router';
import { authGuard } from './core/providers/guards/auth.guard';
import { permissionGuard } from './core/providers/guards/permission.guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'home',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      {
        path: 'estagios',
        canActivate: [authGuard, permissionGuard],
        loadComponent: () => import('./routes/internships/internships.page').then(m => m.InternshipsPage)
      },
      {
        path: 'dashboard',
        canActivate: [authGuard, permissionGuard],
        loadChildren: () => import('./routes/dashboard/dashboard.page.routes').then(m => m.routes)
      },
      {
        path: 'vagas',
        canActivate: [authGuard, permissionGuard],
        loadChildren: () => import('./routes/vacancies/vacancies.page.routes').then(m => m.routes)
      },
      {
        path: 'alunos',
        canActivate: [authGuard, permissionGuard],
        loadChildren: () => import('./routes/users/users.page.routes').then(m => m.routes)
      }
    ]
  },
  {
    path: 'autenticacao',
    loadChildren: () => import('./routes/auth/authentication.page.routes').then(m => m.routes)
  },
];
