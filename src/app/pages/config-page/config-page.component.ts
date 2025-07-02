import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { ReservationFormService } from '../../services/reservation-form.service';
import { ReservationConfigStaticService } from '../../services/reservation-config-static.service';
import {
  ReservationConfigDailyDTO,
  ReservationConfigIntervalDTO,
} from '../../models/reservation-config.dto';
import { ReservationApiService } from '../../services/reservation-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

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
    CommonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatSnackBarModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './config-page.component.html',
  styleUrl: './config-page.component.css',
})
export class ConfigPageComponent {
  snackBar = inject(MatSnackBar);
  formService = inject(ReservationFormService);
  apiService = inject(ReservationApiService);
  configService = inject(ReservationConfigStaticService);

  capacityForm: FormGroup | null = null;
  selectedFrequency: '' | 'daily' | 'interval' = '';

  weekdays = this.configService.getWeekdays();
  frequencyOptions = this.configService.getFrequencyOptions();

  ngOnInit() {}

  onFrequencyChange(frequency: '' | 'daily' | 'interval') {
    this.selectedFrequency = frequency;
    this.capacityForm = this.formService.createConfigForm(frequency);

    this.capacityForm
      .get('sameScheduleAllDays')
      ?.valueChanges.subscribe((value) => {
        if (value) this.applySameScheduleToAll();
      });
  }

  get serviceDays(): FormArray {
    return this.capacityForm?.get('serviceDays') as FormArray;
  }

  toggleDay(day: string, checked: boolean) {
    if (!this.capacityForm) return;

    if (checked) {
      const dayGroup = this.formService.createServiceDay(day);
      this.serviceDays.push(dayGroup);

      const sameSchedule = this.capacityForm?.get('sameScheduleAllDays')?.value;
      if (sameSchedule && day !== 'MON') {
        this.applySameScheduleToAll();
      }

      if (day === 'MON') {
        const times = dayGroup.get('times') as FormArray;
        times.valueChanges.subscribe(() => {
          const sameSchedule = this.capacityForm?.get(
            'sameScheduleAllDays'
          )?.value;
          if (sameSchedule) this.applySameScheduleToAll();
        });
      }
    } else {
      const index = this.serviceDays.controls.findIndex(
        (group) => group.get('day')?.value === day
      );
      if (index !== -1) {
        this.serviceDays.removeAt(index);
      }
    }
  }

  getTypedTimeGroupArray(array: FormArray): FormGroup[] {
    return array.controls as FormGroup[];
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
      times.push(this.formService.createTimeSlot());
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
    return this.capacityForm?.get('holidays') as FormArray;
  }

  addHoliday() {
    this.holidays.push(this.formService.createHoliday());
  }

  removeHoliday(index: number) {
    this.holidays.removeAt(index);
  }

  getTypedHolidayArray(array: FormArray): FormControl[] {
    return array.controls as FormControl[];
  }

  getTypedHolidayGroupArray(array: FormArray): FormGroup[] {
    return array.controls as FormGroup[];
  }

  applySameScheduleToAll() {
    if (!this.capacityForm) return;

    const sameSchedule = this.capacityForm.get('sameScheduleAllDays')?.value;
    const mondayGroup = this.getDayGroup('MON');
    if (!sameSchedule || !mondayGroup) return;

    const mondayTimes = this.getTimesArray('MON');
    if (!mondayTimes || mondayTimes.length === 0) return;

    const mondayValues = mondayTimes.controls.map((ctrl) => ({
      startTime: ctrl.get('startTime')?.value,
      endTime: ctrl.get('endTime')?.value,
    }));

    this.serviceDays.controls.forEach((dayGroup) => {
      const dayValue = dayGroup.get('day')?.value;
      if (dayValue !== 'MON') {
        const targetTimes = dayGroup.get('times') as FormArray;
        targetTimes.clear();

        mondayValues.forEach((time) => {
          const timeGroup = this.formService.createTimeSlot();
          timeGroup.patchValue(time);
          targetTimes.push(timeGroup);
        });
      }
    });
  }

  // submit() {
  //   if (!this.capacityForm || this.capacityForm.invalid) return;

  //   if (this.selectedFrequency === 'interval') {
  //     const formData: ReservationConfigIntervalDTO = {
  //       ...this.capacityForm.value,
  //       frequency: this.selectedFrequency,
  //     };

  //     this.apiService.saveIntervalConfig(formData).subscribe({
  //       next: () => {
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'Guardado',
  //           text: 'Reservaciones configuradas.',
  //         });
  //         this.capacityForm = null;
  //         this.selectedFrequency = '';
  //       },
  //       error: (err) => {
  //         console.error(err);
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Error',
  //           text: 'No se pudo guardar la config.',
  //         });
  //       },
  //     });
      
  //     console.log(formData);
  //   } else if (this.selectedFrequency === 'daily') {
  //     const formData: ReservationConfigDailyDTO = {
  //       ...this.capacityForm.value,
  //       frequency: this.selectedFrequency,
  //     };

  //     this.apiService.saveDailyConfig(formData).subscribe({
  //       next: () => {
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'Guardado',
  //           text: 'Reservaciones configuradas.',
  //         });
  //         this.capacityForm = null;
  //         this.selectedFrequency = '';
  //       },
  //       error: (err) => {
  //         console.error(err);
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Error',
  //           text: 'No se pudo guardar la config.',
  //         });
  //       },
  //     });
  //   }
  // }
  submit() {
  if (!this.capacityForm || this.capacityForm.invalid) return;

  Swal.fire({
    title: '¿Guardar configuración?',
    text: 'Confirma que deseas guardar esta configuración.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      // ✅ Si confirma, continua con el guardado
      if (this.selectedFrequency === 'interval') {
        const formData: ReservationConfigIntervalDTO = {
          ...this.capacityForm?.value,
          frequency: this.selectedFrequency,
        };

        this.apiService.saveIntervalConfig(formData).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Guardado',
              text: 'Reservaciones configuradas.',
            });
            this.capacityForm?.reset();
            this.selectedFrequency = '';
          },
          error: (err) => {
            console.error(err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo guardar la config.',
            });
          },
        });
        console.log(formData);
      } else if (this.selectedFrequency === 'daily') {
        const formData: ReservationConfigDailyDTO = {
          ...this.capacityForm?.value,
          frequency: this.selectedFrequency,
        };

        this.apiService.saveDailyConfig(formData).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Guardado',
              text: 'Reservaciones configuradas.',
            });
            this.capacityForm?.reset();
            this.selectedFrequency = '';
          },
          error: (err) => {
            console.error(err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo guardar la config.',
            });
          },
        });
      }
    }
    // ✅ Si cancela, no hace nada
  });
}

}
