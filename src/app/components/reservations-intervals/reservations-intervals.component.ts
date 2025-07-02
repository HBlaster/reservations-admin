import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';

import { ReservationApiService } from '../../services/reservation-api.service';

@Component({
  selector: 'app-reservations-intervals',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatTableModule],
  templateUrl: './reservations-intervals.component.html',
  styleUrl: './reservations-intervals.component.css',
})
export class ReservationsIntervalsComponent {

  displayedColumns: string[] = ['horario', 'status', 'nombre', 'email'];
  dataSource: any[] = []; 

  constructor(private reservationAPI: ReservationApiService){}

  ngOnInit(){}

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      const date = event.value;
      console.log("fecha seleccionada: ", event.value);
      this.reservationAPI.getAvailabilityIntervalByDate(date).subscribe({
        next: (data: any) => {
    const sorted = data.capacity.sort((a: any, b: any) => {
      const timeA = a.startTime.split(':').map(Number);
      const timeB = b.startTime.split(':').map(Number);

      // Compara horas primero, luego minutos si es igual la hora
      if (timeA[0] !== timeB[0]) {
        return timeA[0] - timeB[0];
      }
      return timeA[1] - timeB[1];
    });

    this.dataSource = sorted;
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
