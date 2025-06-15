import { HttpHeaders, HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../interfaces/user.interface";
import { Router } from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  router: Router = inject(Router);

  login(pauload: { username: string, password: string }): Observable<any> {
    return this.http.post(
      'http://localhost:8080/api/auth/signin',
      pauload,
      httpOptions
    )
  }

  register(pauload: { username: string, email: string, password: string, role: string[] }): Observable<any> {
    return this.http.post(
      'http://localhost:8080/api/admin/newuserregister',
      pauload,
      httpOptions
    );
  }

  logout(): Observable<any> {    
    return this.http.post('http://localhost:8080/api/auth/signout', {}, httpOptions);
  }

  getAllUsers() {
    return this.http.get<User[]>('http://localhost:8080/api/admin/getallusers');
  }

  deleteUser(id: number) {
    return this.http.delete('http://localhost:8080/api/admin/deleteuser/' + id);
  }
}
