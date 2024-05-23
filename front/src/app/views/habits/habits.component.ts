import { NgFor, NgStyle, AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { DayControl, Habit } from '../../models/interfaces';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { checkedStyle } from '../../shared/utils/style';

@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [NgStyle, NgFor, AsyncPipe, FormsModule],

  templateUrl: './habits.component.html',
  styleUrl: './habits.component.scss',
})
export class HabitsComponent {
  private service = inject(ServiceService);
  habits = new Observable<Habit[]>();
  checkedStyle = checkedStyle;

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
      next: () => {
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

  deleteHabit(id: any) {
    this.service.deleteHabit(id).subscribe({
      next: () => {
        this.loadHabitData();
      },
    });
  }
}
