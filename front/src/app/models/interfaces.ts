export interface DayControl {
  completed: boolean;
  day: number;
}

export interface Habit {
  id?: number;
  name: string;
  days: DayControl[];
}
