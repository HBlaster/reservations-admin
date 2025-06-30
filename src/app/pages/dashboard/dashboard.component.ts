import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReservationApiService } from '../../services/reservation-api.service'; // Import the service if needed
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatProgressSpinnerModule, CommonModule],
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
    // Code to run on component initialization
    this.reservationApiService.getReservationConfig().subscribe({
      next: (res: any) => {
        console.log('Configuration loaded:', res);
        this.config = res;
        console.log('Configuration loaded:', this.config.frequency);
        console.log('Holidays loaded:', this.config.holidays);
        console.log('Service days loaded:', this.config.serviceDays);
      },
      error: (error: any) => {
        console.error('Error loading configuration:', error);
        this.config.frequency = null;
        this.config.holidays = [];
        this.config.serviceDays = [];
        console.log(
          'No configuration found, using default frequency:',
          this.config.frequency
        );
      },
      complete: () => {
        console.log('Configuration loading complete');
        this.loading = false; // Set loading to false when complete
      },
    });
    console.log('Dashboard component initialized');
  }
}
