export interface DayControl {
  completed: boolean;
  day: number;
}

export interface Habit {
  name: string;
  days: DayControl[];
}
