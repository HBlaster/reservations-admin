import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReservationApiService } from '../../services/reservation-api.service'; // Import the service if needed
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



import { ReservationsDailyComponent } from '../../components/reservations-daily/reservations-daily.component';
import { ReservationsIntervalsComponent } from '../../components/reservations-intervals/reservations-intervals.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    CommonModule,
    ReservationsDailyComponent,
    ReservationsIntervalsComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private reservationApiService: ReservationApiService) {
    // Initialization code can go here
  }

  config: any; // Initialize config as an empty object
  loading: boolean = true; // Flag to indicate loading state

  ngOnInit() {
    this.getReservationConfig();
  }

  getReservationConfig() {
    this.loading = true;

    this.reservationApiService.getReservationConfig().subscribe({
      next: (response: any) => {
        console.log('API response:', response);

        // Si la respuesta es válida y tiene frequency
        if (response && response.frequency != null) {
          this.config = response;
        } else {
          // Si no hay configuración en la BD
          this.config = { frequency: null, serviceDays: [], holidays: [] };
        }

        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener configuración:', error);

        // Si hay error en la petición, define config como vacío
        this.config = { frequency: null, serviceDays: [], holidays: [] };
        this.loading = false;
      },
    });
  }
}
