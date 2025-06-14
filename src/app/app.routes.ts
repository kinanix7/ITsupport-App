import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { TechnicienGuard } from './core/guards/technicien.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'equipements',
    loadChildren: () => import('./features/equipements/equipements.routes').then(m => m.equipementsRoutes),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'pannes',
    loadChildren: () => import('./features/pannes/pannes.routes').then(m => m.pannesRoutes),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'tickets',
    loadChildren: () => import('./features/tickets/tickets.routes').then(m => m.ticketsRoutes),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];