import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ReservationValidatorsService {
  validateTimeRange(group: AbstractControl): ValidationErrors | null {
    const start = group.get('startTime')?.value;
    const end = group.get('endTime')?.value;

    if (!start || !end) return null;
    return start < end ? null : { invalidTimeRange: true };
  }
}
