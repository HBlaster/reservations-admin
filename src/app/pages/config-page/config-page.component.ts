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
import {
  AbstractControl,
  FormArray,
  FormControl,
  ValidationErrors,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

function validateTimeRange(group: AbstractControl): ValidationErrors | null {
  const start = group.get('startTime')?.value;
  const end = group.get('endTime')?.value;

  if (!start || !end) return null; // si alguno está vacío, está ok

  return start < end ? null : { invalidTimeRange: true };
}

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
    MatDividerModule,
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
    sameScheduleAllDays: [false],
    serviceDays: this.fb.array([]),
    holidays: this.fb.array([]),
  });

  ngOnInit() {
    this.capacityForm.get('sameScheduleAllDays')?.valueChanges.subscribe((value) => {
      if (value) {
        this.applySameScheduleToAll();
      }
    });
  }
  
  

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
      const dayGroup = this.fb.group({
        day: [day],
        times: this.fb.array([
          this.fb.group(
            {
              startTime: [''],
              endTime: [''],
            },
            { validators: validateTimeRange }
          ),
        ]),
      });
  
      this.serviceDays.push(dayGroup);
  
      // 🚀 Si está activado el mismo horario, aplicar inmediatamente
      const sameSchedule = this.capacityForm.get('sameScheduleAllDays')?.value;
      if (sameSchedule && day !== 'MON') {
        this.applySameScheduleToAll();  // <-- esta es la clave
      }
  
      if (day === 'MON') {
        const times = dayGroup.get('times') as FormArray;
        times.valueChanges.subscribe(() => {
          const sameSchedule = this.capacityForm.get('sameScheduleAllDays')?.value;
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
      times.push(
        this.fb.group(
          {
            startTime: [''],
            endTime: [''],
          },
          { validators: validateTimeRange }
        )
      );
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
    this.holidays.push(
      this.fb.group(
        {
          date: [''],
          startTime: [''],
          endTime: [''],
        },
        { validators: validateTimeRange }
      )
    );
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
  const sameSchedule = this.capacityForm.get('sameScheduleAllDays')?.value;
  const lunesGroup = this.getDayGroup('MON');
  if (!sameSchedule || !lunesGroup) return;

  const lunesTimes = this.getTimesArray('MON');
  if (!lunesTimes || lunesTimes.length === 0) return;

  const lunesValues = lunesTimes.controls.map(ctrl => ({
    startTime: ctrl.get('startTime')?.value,
    endTime: ctrl.get('endTime')?.value
  }));

  this.serviceDays.controls.forEach(dayGroup => {
    const dayValue = dayGroup.get('day')?.value;
    if (dayValue !== 'MON') {
      const targetTimes = dayGroup.get('times') as FormArray;
      targetTimes.clear(); // limpia antes de copiar

      lunesValues.forEach(time =>
        targetTimes.push(
          this.fb.group({
            startTime: [time.startTime],
            endTime: [time.endTime]
          }, { validators: validateTimeRange })
        )
      );
    }
  });
}

  

  submit() {
    console.log(this.capacityForm.value);
    console.log('form working correctly');
  }
}
