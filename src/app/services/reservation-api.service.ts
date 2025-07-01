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
      Authorization: `Bearer ${token}`,
    };
    return this.http.post(`${this.apiUrl}config-reservation`, config, {
      headers,
    });
  }

  saveIntervalConfig(config: any) {
    const token = localStorage.getItem('access_token') || '';
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.post(
      `${this.apiUrl}config-reservation/intervals-config`,
      config,
      { headers }
    );
  }

  getReservationConfig() {
    const url = `${environment.apiUrl}config-reservation/active-config`;
    return this.http.get(url);
  }

  getDailyReservationsConfirmed(date: Date) {
    const formattedDate = date.toISOString().split('T')[0];
    const url = `${environment.apiUrl}config-reservation/daily-confirmed?date=${formattedDate}`;
    return this.http.get(url);
  }

  getAvailabilityIntervalByDate(date: Date, type: string = 'interval') {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    const url = `${environment.apiUrl}config-reservation/availability/${formattedDate}?type=${type}`;
    return this.http.get(url);
  }
}
