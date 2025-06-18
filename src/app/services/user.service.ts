import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/admin';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get(`${API_URL}/getallusers`);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/deleteuser/${id}`);
  }
}
