import { Routes } from "@angular/router";
import { UsersPage } from "./users.page";

export const routes: Routes = [
    {
        path: '',
        component: UsersPage,
        children: [
            {
                path: '',
                loadComponent: () => import('./table/table.component').then(m => m.UsersTableComponent)
            },
            // {
            //     path: 'criar',
            //     loadComponent: () => import('./vacanceForm/vacance-form.page').then(m => m.VacanceFormPage)
            // },
            // {
            //     path: 'editar/:vacanceId',
            //     loadComponent: () => import('./vacanceForm/vacance-form.page').then(m => m.VacanceFormPage)
            // }
        ]
    }
];