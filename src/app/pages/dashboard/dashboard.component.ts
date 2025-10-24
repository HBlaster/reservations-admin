import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {CommonService} from '../../services/common.service';



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
  constructor(
    private commonService: CommonService
  ) {
  }

  config: any; // Initialize config as an empty object
  loading: boolean = true; // Flag to indicate loading state

  ngOnInit() {
    this.commonService.getReservationConfig().subscribe({
  next: (data) => {
    this.config = data;
    this.loading = false;
  },
  error: (error) => {
    console.error('Error fetching reservation config:', error);
    this.loading = false;
  }
});

  }

}
