import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import {ReservationApiService} from './reservation-api.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private reservationApiService: ReservationApiService  
  ) { }
  getReservationConfig(): Observable<any> {

    return this.reservationApiService.getReservationConfig().pipe(
      map((response: any) => {
        // Si la respuesta es válida y tiene frequency
        if (response && response.frequency != null) {
          return response;
        } else {
          // Si no hay configuración en la BD
          return { frequency: null, serviceDays: [], holidays: [] };
        }

      }),
      catchError(error => {
        console.error('Error al obtener configuración:', error);

        // Si hay error en la petición, define config como vacío
        return of({ frequency: null, serviceDays: [], holidays: [] });
      })
    );
  }
}
