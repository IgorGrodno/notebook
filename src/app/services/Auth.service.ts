import { HttpHeaders, HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

interface RegisterResponse {
  success: boolean;
  message: string;
  errorCode?: string;
  username?: string;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  private authUrl = 'http://localhost:8080/api/auth';

  router: Router = inject(Router);

  login(pauload: { username: string; password: string }): Observable<any> {
    return this.http.post(this.authUrl + '/signin', pauload, httpOptions);
  }

  logout(): Observable<any> {
    return this.http
      .post(this.authUrl + '/signout', {}, httpOptions)
      .pipe(tap(() => this.storageService.clean()));
  }

  register(pauload: {
    username: string;
    email: string;
    password: string;
  }): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      this.authUrl + '/newuserregister',
      pauload,
      httpOptions
    );
  }
}
