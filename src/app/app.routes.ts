import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { Notes } from './components/notes/notes';
import { Registration } from './components/registration/registration';
import { AdminPage } from './components/admin-page/admin-page';

export const routes: Routes = [
  {
    path: '',
    component: Notes,
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
  },
];
