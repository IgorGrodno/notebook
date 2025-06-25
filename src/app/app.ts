import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Notes } from './components/notes/notes';
import { Router, RouterOutlet } from '@angular/router';
import { User } from './interfaces/user.interface';
import { AuthService } from './services/Auth.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'notebook';

  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);
  storageService: StorageService = inject(StorageService);

  isAuth!: boolean;
  currentUser: User;

  constructor() {
    this.currentUser = this.storageService.getUser();
    this.isAuth = this.storageService.isLoggedIn();
  }

  logOut() {
    this.authService.logout().subscribe();
    this.storageService.clean();
    this.isAuth = this.storageService.isLoggedIn();
    window.location.reload();
  }
}
