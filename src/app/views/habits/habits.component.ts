import { NgFor, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { Habit } from '../../models/interfaces';

@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [NgStyle, NgFor],
  templateUrl: './habits.component.html',
  styleUrl: './habits.component.scss',
})
export class HabitsComponent {
  habits: any[] = [];

  constructor(private service: ServiceService) {}

  ngOnInit() {
    this.loadHabitData();
    this.getNewHabit();
  }

  getNewHabit() {
    this.service.habitShared$.subscribe((habit: Habit) => {
      this.addHabit(habit);
    });
  }

  loadHabitData() {
    const data = localStorage.getItem('habitData');
    if (data) {
      this.habits = JSON.parse(data);
    }
  }

  addHabit(newHabit: Habit) {
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
