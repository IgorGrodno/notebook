import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { Notes } from './components/notes/notes';
import { Registration } from './components/registration/registration';
import { AdminPage } from './components/admin-page/admin-page';
import { AuthGuard } from './guards/auth-guard';
import { AdminGuard } from './guards/admin-guard';

export const routes: Routes = [
  {
    path: '',
    component: Notes,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'registration',
    component: Registration,
  },
  {
    path: 'adminPage',
    component: AdminPage,
    canActivate: [AdminGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
