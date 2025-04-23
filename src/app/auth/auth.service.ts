import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${environment.apiUrl}auth/login`;

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }  

  login(oUser: any){
    return this.http.post(this.apiUrl, oUser);
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }
}
