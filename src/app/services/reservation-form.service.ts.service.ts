import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
// import { ReservationValidatorsService } from './reservation-validators.service'; // si luego lo separas

@Injectable({ providedIn: 'root' })
export class ReservationFormService {
  constructor(
    private fb: FormBuilder
    // private validator: ReservationValidatorsService // descomenta si luego lo separas
  ) {}

  createConfigForm(): FormGroup {
    return this.fb.group({
      capacity: [0, [Validators.required, Validators.min(1)]],
      frecuency: ['', [Validators.required]],
      sameScheduleAllDays: [false],
      serviceDays: this.fb.array([]),
      holidays: this.fb.array([]),
    });
  }

  createTimeSlot(): FormGroup {
    return this.fb.group({
      startTime: [''],
      endTime: [''],
    }, { validators: this.validateTimeRange });
    // si separas validaciones: { validators: this.validator.validateTimeRange }
  }

  createServiceDay(day: string): FormGroup {
    return this.fb.group({
      day: [day],
      times: this.fb.array([this.createTimeSlot()])
    });
  }

  createHoliday(): FormGroup {
    return this.fb.group({
      date: [''],
      startTime: [''],
      endTime: ['']
    }, { validators: this.validateTimeRange });
  }

  // 🔒 validación local (si no usas el ReservationValidatorsService)
  private validateTimeRange(group: any): any {
    const start = group.get('startTime')?.value;
    const end = group.get('endTime')?.value;
    if (!start || !end) return null;
    return start < end ? null : { invalidTimeRange: true };
  }
}
