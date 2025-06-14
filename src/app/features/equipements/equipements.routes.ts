import { Routes } from '@angular/router';

export const equipementsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./equipements-list/equipements-list.component').then(m => m.EquipementsListComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./equipement-form/equipement-form.component').then(m => m.EquipementFormComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./equipement-form/equipement-form.component').then(m => m.EquipementFormComponent)
  }
];