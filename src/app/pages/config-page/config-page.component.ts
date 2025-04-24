import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'; // Si usas botones después
import { MatIconModule } from '@angular/material/icon'; // Si agregas íconos

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './config-page.component.html',
  styleUrl: './config-page.component.css'
})
export class ConfigPageComponent {

  constructor(
      private fb: FormBuilder,
      private router: Router
    ) {}

    capacityForm: FormGroup = this.fb.group({});
    ngOnInit() {
      this.capacityForm = this.fb.group({
        capacity: [0, [Validators.required, Validators.min(1)]],
        frecuency: ['', [Validators.required, Validators.min(1)]],
        // businessdays: ['', [Validators.required, Validators.min(1)]],
        // holidays: ['', [Validators.required, Validators.min(1)]],
        // startdate: ['', [Validators.required]],
        // starttime: ['', [Validators.required]],
      });
    }

  submit(){
    console.log(this.capacityForm.value);
    console.log('form working correctly');
  }

}
