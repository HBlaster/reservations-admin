import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReservationApiService } from '../../services/reservation-api.service';

@Component({
  selector: 'app-reservations-intervals',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, ],
  templateUrl: './reservations-intervals.component.html',
  styleUrl: './reservations-intervals.component.css',
})
export class ReservationsIntervalsComponent {

  constructor(private reservationAPI: ReservationApiService){}

  ngOnInit(){}

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      const date = event.value;
      console.log("fecha seleccionada: ", event.value);
      this.reservationAPI.getAvailabilityIntervalByDate(date).subscribe({
        next: (data:any)=>{
          console.log(data);
        },
        error: (error) => {
          console.error(
            'Error al obtener reservas diarias confirmadas:',
            error
          );
        }
      });
    }
  }

}
