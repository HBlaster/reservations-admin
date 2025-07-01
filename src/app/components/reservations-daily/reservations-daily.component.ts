import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReservationApiService } from '../../services/reservation-api.service';

@Component({
  selector: 'app-reservations-daily',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './reservations-daily.component.html',
  styleUrl: './reservations-daily.component.css',
})
export class ReservationsDailyComponent {
  constructor(private reservationApi: ReservationApiService) {}

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      const date = event.value;

      this.reservationApi.getDailyReservationsConfirmed(date).subscribe(
        (data) => {
          console.log('Reservas diarias confirmadas:', data);
        },
        (error) => {
          console.error(
            'Error al obtener reservas diarias confirmadas:',
            error
          );
        }
      );
    }

    // Aquí ejecutas la lógica que desees con la fecha seleccionada
  }
}
