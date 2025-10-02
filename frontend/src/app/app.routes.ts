// app.routes.ts
import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth';
import { DashboardComponent } from './dashboard/dashboard';
import { AuthGuard } from './auth-guard';
import { NoAuthGuard } from './no-auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
