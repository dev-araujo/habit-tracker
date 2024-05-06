import { NgFor, NgStyle, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { DayControl, Habit } from '../../models/interfaces';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [NgStyle, NgFor, AsyncPipe, FormsModule],

  templateUrl: './habits.component.html',
  styleUrl: './habits.component.scss',
})
export class HabitsComponent {
  habits = new Observable<Habit[]>();

  constructor(private service: ServiceService) {}

  ngOnInit() {
    this.loadHabitData();
    this.getNewHabit();
  }

  getNewHabit() {
    this.service.habitShared$.subscribe((habitName: string) => {
      this.addHabit(habitName);
    });
  }

  addHabit(newHabit: string) {
    this.service.createNewHabit(newHabit).subscribe({
      next: (habit) => {
        this.loadHabitData();
      },
    });
  }

  loadHabitData() {
    this.habits = this.service.getHabits();
  }

  edit(habit: Habit, day?: DayControl) {
    if (day) {
      day.completed = !day.completed;
    }
    this.service.updateHabit(habit).subscribe();
  }
}
