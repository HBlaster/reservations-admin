import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'; // Si usas botones después
import { MatIconModule } from '@angular/material/icon'; // Si agregas íconos
import { MatSelectModule } from '@angular/material/select';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormArray, FormControl } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

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
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
  MatNativeDateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './config-page.component.html',
  styleUrl: './config-page.component.css',
})
export class ConfigPageComponent {
  private fb = inject(FormBuilder);
  weekdays = [
    { label: 'Lunes', value: 'MON' },
    { label: 'Martes', value: 'TUE' },
    { label: 'Miércoles', value: 'WED' },
    { label: 'Jueves', value: 'THU' },
    { label: 'Viernes', value: 'FRI' },
    { label: 'Sábado', value: 'SAT' },
    { label: 'Domingo', value: 'SUN' },
  ];

  capacityForm = this.fb.group({
    capacity: [0, [Validators.required, Validators.min(1)]],
    frecuency: ['', [Validators.required]],
    serviceDays: this.fb.array([]),
    holidays: this.fb.array([]),
  });

  frecuencySignal = toSignal(this.capacityForm.get('frecuency')!.valueChanges, {
    initialValue: '',
  });

  frecuencyOptions = [
    { value: 'daily', viewValue: 'Diario' },
    { value: 'hour', viewValue: 'hora' },
    { value: 'minute', viewValue: 'minutos' },
  ];

  get serviceDays(): FormArray {
    return this.capacityForm.get('serviceDays') as FormArray;
  }

  toggleDay(day: string, checked: boolean) {
    if (checked) {
      this.serviceDays.push(
        this.fb.group({
          day: [day],
          times: this.fb.array([this.fb.control('')])
        })
      );
    } else {
      const index = this.serviceDays.controls.findIndex(
        (group) => group.get('day')?.value === day
      );
      if (index !== -1) {
        this.serviceDays.removeAt(index);
      }
    }
  }

  getDayGroup(day: string): FormGroup | null {
    return this.serviceDays.controls.find(
      (ctrl) => ctrl.get('day')?.value === day
    ) as FormGroup;
  }
  
  getTimesArray(day: string): FormArray | null {
    const group = this.getDayGroup(day);
    return group ? (group.get('times') as FormArray) : null;
  }
  
  addTimeSlot(day: string) {
    const times = this.getTimesArray(day);
    if (times) {
      times.push(this.fb.control(''));
    }
  }
  
  removeTimeSlot(day: string, index: number) {
    const times = this.getTimesArray(day);
    if (times) {
      times.removeAt(index);
    }
  }
  
  

  isDaySelected(day: string): boolean {
    return this.serviceDays.controls.some(
      (group) => group.get('day')?.value === day
    );
  }

  getTimeControl(day: string): FormControl | null {
    const group = this.serviceDays.controls.find(
      (ctrl) => ctrl.get('day')?.value === day
    ) as FormGroup;
    return group ? (group.get('time') as FormControl) : null;
  }

  getTypedTimeArray(array: FormArray): FormControl[] {
    return array.controls as FormControl[];
  }

  get holidays(): FormArray {
    return this.capacityForm.get('holidays') as FormArray;
  }
  
  addHoliday() {
    this.holidays.push(this.fb.control('', Validators.required));
  }
  
  removeHoliday(index: number) {
    this.holidays.removeAt(index);
  }

  getTypedHolidayArray(array: FormArray): FormControl[] {
    return array.controls as FormControl[];
  }
  
  
  

  submit() {
    console.log(this.capacityForm.value);
    console.log('form working correctly');
  }
}