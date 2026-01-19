import { Routes } from "@angular/router";
import { DashboardPage } from "./dashboard.page";

export const routes: Routes = [
    {
        path: '',
        component: DashboardPage,
        children: [
            {
                path: '',
                loadComponent: () => import('./user-page/user-page.page').then(m => m.UserPage)
            },
            {
                path: 'criar-estagio',
                loadComponent: () => import('./internship-form/internship-form.page').then(m => m.InternshipFormPage)
            }
        ]
    }
];