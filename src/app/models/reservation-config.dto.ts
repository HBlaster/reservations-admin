export interface ReservationConfigDTO {
    capacity: number;
    frequency: 'daily' | 'interval';
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
  