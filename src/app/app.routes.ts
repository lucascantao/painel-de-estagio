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
        // loadChildren: () => import('./routes/visualization/visualization.page.routes').then(m => m.routes)
        loadComponent: () => import('./routes/internships/internships.page').then(m => m.InternshipsPage)
      },
    //   {
    //     path: 'admin',
    //     children: [
    //       {
    //         path:'',
    //         loadComponent: () => import('./routes/access-control/access-control.page').then(m => m.AccessControlPage)
    //       }
    //     ]
    //   },
      {
        path: 'dashboard',
        canActivate: [authGuard, permissionGuard],
        loadComponent: () => import('./routes/dashboard/dashboard.page').then(m => m.DashboardPage)
      },
      {
        path: 'vagas',
        canActivate: [authGuard, permissionGuard],
        loadComponent: () => import('./routes/vacancies/vacancies.page').then(m => m.VacanciesPage)
      },
    //   {
    //     path: 'logistica',
    //     loadComponent: () => import('./routes/logistics/logistics.page').then(m => m.LogisticsPage)
    //   }
    ]
  },
  {
    path: 'autenticacao',
    loadChildren: () => import('./routes/auth/authentication.page.routes').then(m => m.routes)
  },
//   {
//     path: '',
//     redirectTo: 'consulta',
//     pathMatch: 'full'
//   },
//   {
//     path: 'home',
//     redirectTo: 'consulta',
//     pathMatch: 'full'
//   },
//   {
//     path: '',
//     children: [
//       {
//         path: 'consulta',
//         canActivate: [authGuard, permissionGuard],
//         loadChildren: () => import('./routes/visualization/visualization.page.routes').then(m => m.routes)
//       },
//       {
//         path: 'admin',
//         children: [
//           {
//             path:'',
//             loadComponent: () => import('./routes/access-control/access-control.page').then(m => m.AccessControlPage)
//           }
//         ]
//       },
//       {
//         path: 'registro',
//         canActivate: [authGuard, permissionGuard],
//         loadChildren: () => import('./routes/registry/registry.page.routes').then(m => m.routes)
//       },
//       {
//         path: 'logistica',
//         loadComponent: () => import('./routes/logistics/logistics.page').then(m => m.LogisticsPage)
//       }
//     ]
//   },
//   {
//     path: 'autenticacao',
//     loadChildren: () => import('./routes/auth/authentication.page.routes').then(m => m.routes)
//   },
];
