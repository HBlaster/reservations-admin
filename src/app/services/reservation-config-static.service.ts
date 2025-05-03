import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ReservationConfigStaticService {
  getWeekdays() {
    return [
      { label: 'Monday', value: 'MON' },
      { label: 'Tuesday', value: 'TUE' },
      { label: 'Wednesday', value: 'WED' },
      { label: 'Thursday', value: 'THU' },
      { label: 'Friday', value: 'FRI' },
      { label: 'Saturday', value: 'SAT' },
      { label: 'Sunday', value: 'SUN' },
    ];
  }

  getFrequencyOptions() {
    return [
      { value: 'daily', viewValue: 'Daily' },
      { value: 'interval', viewValue: 'Interval' },
    ];
  }
}
