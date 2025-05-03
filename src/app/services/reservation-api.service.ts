import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReservationApiService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  saveConfig(config: any) {
    console.log('Saving config:', config);
    return this.http.post(`${this.apiUrl}config-reservation`, config);
  }

}
