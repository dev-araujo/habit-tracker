export interface DayControl {
  completed: boolean;
  day: number;
}

export interface Habit {
  id?: number;
  name: string;
  days: DayControl[];
  createdAt: Date | string;
  endDate: Date | string;
}

export interface ResEdited {
  data: Habit;
  message: string;
}
