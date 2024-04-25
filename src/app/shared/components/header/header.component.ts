import { Component } from '@angular/core';
import { ServiceService } from '../../../service/service.service';
import { Habit } from '../../../models/interfaces';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private service: ServiceService) {}
  addHabit(habitName: string) {
    const newHabit: Habit = { name: habitName, days: [] };
    for (let i = 1; i <= 30; i++) {
      newHabit.days.push({ day: i, completed: false });
    }

    this.service.emitHabit(newHabit);
  }
}
