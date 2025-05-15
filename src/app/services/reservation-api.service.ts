import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class ReservationApiService {
  
  private apiUrl = `${environment.apiUrl}`;

  

  constructor(private http: HttpClient) {}

  saveDailyConfig(config: any) {
    const token = localStorage.getItem('access_token') || '';
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.post(`${this.apiUrl}config-reservation`, config, {headers} );
  }

  saveIntervalConfig(config: any) {
    const token = localStorage.getItem('access_token') || '';
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.post(`${this.apiUrl}config-reservation/intervals-config`, config, {headers} );
  }

}
