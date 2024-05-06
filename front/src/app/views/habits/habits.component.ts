import { NgFor, NgStyle, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { Habit } from '../../models/interfaces';
import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';

@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [NgStyle, NgFor, AsyncPipe],

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

  edit() {}

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

  toggleDayStatus(habit: any, day: any) {
    day.completed = !day.completed;
    this.service.updateHabit(habit).subscribe();
  }
}
