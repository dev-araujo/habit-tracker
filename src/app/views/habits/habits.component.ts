import { NgFor, NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [NgStyle, NgFor],
  templateUrl: './habits.component.html',
  styleUrl: './habits.component.scss',
})
export class HabitsComponent {
  habits: any[] = [];

  ngOnInit() {
    this.loadHabitData();
  }

  loadHabitData() {
    const data = localStorage.getItem('habitData');
    if (data) {
      this.habits = JSON.parse(data);
    }
  }

  addHabit(habitName: string) {
    const newHabit: any = { name: habitName, days: [] };
    for (let i = 1; i <= 30; i++) {
      newHabit.days.push({ day: i, completed: false });
    }
    this.habits.push(newHabit);
    this.saveHabitData();
  }

  toggleDayStatus(habit: any, day: any) {
    day.completed = !day.completed;
    this.saveHabitData();
  }

  saveHabitData() {
    localStorage.setItem('habitData', JSON.stringify(this.habits));
  }
}
