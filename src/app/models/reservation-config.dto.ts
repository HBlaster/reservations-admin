export interface ReservationConfigDailyDTO {
  capacity: number;
  frequency: 'daily';
  sameScheduleAllDays: boolean;
  serviceDays: {
    day: string; // 'MON', 'TUE', etc.
    times: {
      startTime: string; // formato 'HH:mm'
      endTime: string;
    }[];
  }[];
  holidays: {
    date: string; // formato ISO (yyyy-MM-dd)
    startTime?: string;
    endTime?: string;
  }[];
}

export interface ReservationConfigIntervalDTO {
  appointmentDuration: number;
  breakTime: number;
  frequency: 'interval';
  sameScheduleAllDays: boolean;
  serviceDays: {
    day: string; // 'MON', 'TUE', etc.
    times: {
      startTime: string; // formato 'HH:mm'
      endTime: string;
    }[];
  }[];
  holidays: {
    date: string; // formato ISO (yyyy-MM-dd)
    startTime?: string;
    endTime?: string;
  }[];
}
