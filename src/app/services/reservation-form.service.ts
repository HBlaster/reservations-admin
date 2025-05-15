import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationValidatorsService } from './reservation-validators.service'; // si luego lo separas

@Injectable({ providedIn: 'root' })
export class ReservationFormService {
  constructor(
    private fb: FormBuilder,
    private validator: ReservationValidatorsService
  ) {}
  

  createConfigForm(frequency:string): FormGroup {
    if(frequency === 'daily'){
      return this.fb.group({
      capacity: [0, [Validators.required, Validators.min(1)]],
      sameScheduleAllDays: [false],
      serviceDays: this.fb.array([]),
      holidays: this.fb.array([]),
    });
    }
    return this.fb.group({
      appointmentDuration: [0, [Validators.required, Validators.min(1)]],
      breakTime: [0, [Validators.required, Validators.min(1)]],
      sameScheduleAllDays: [false],
      serviceDays: this.fb.array([]),
      holidays: this.fb.array([]),
    });
    
  }

  createTimeSlot(): FormGroup {
    return this.fb.group({
      startTime: [''],
      endTime: [''],
    }, { validators: this.validator.validateTimeRange }) 
    
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
      endTime: [''],
    }, { validators: this.validator.validateTimeRange });
  }
  

}
