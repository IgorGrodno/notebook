import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { Notes } from './components/notes/notes';
import { Registration } from './components/registration/registration';

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
];
