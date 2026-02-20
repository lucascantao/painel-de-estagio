import { Routes } from "@angular/router";
import { VacanciesPage } from "./vacancies.page";

export const routes: Routes = [
    {
        path: '',
        component: VacanciesPage,
        children: [
            {
                path: '',
                loadComponent: () => import('./table/table.component').then(m => m.VacanciesTableComponent)
            },
            {
                path: 'criar',
                loadComponent: () => import('./vacanceForm/vacance-form.page').then(m => m.VacanceFormPage)
            },
            {
                path: 'editar/:vacanceId',
                loadComponent: () => import('./vacanceForm/vacance-form.page').then(m => m.VacanceFormPage)
            }
        ]
    }
];