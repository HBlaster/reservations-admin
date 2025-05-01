import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReservationApiService {
  private readonly baseUrl = '/api/reservations'; // ⚠️ cambia según tu backend

  constructor(private http: HttpClient) {}

  saveConfig(config: any) {
    console.log('Saving config:', config);
    // return `works well! - ${config}`; 
  }

}
