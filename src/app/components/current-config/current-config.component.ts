import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonService } from '../../services/common.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-current-config',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './current-config.component.html',
  styleUrl: './current-config.component.css',
})
export class CurrentConfigComponent {
  constructor(private commonService: CommonService, private cdr: ChangeDetectorRef) {}
  config: any; // Initialize config as an empty object
  loading: boolean = true; // Flag to indicate loading state
  ngOnInit() {
    this.commonService.getReservationConfig().subscribe({
      next: (data: any) => {
        this.config = data;
        this.loading = false;
        console.log('Current reservation config:', this.config);
        console.log('Loading state:', this.loading);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching current reservation config:', error);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
