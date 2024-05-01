import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Habit } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private habitSubject = new Subject<Habit>();
  habitShared$ = this.habitSubject.asObservable();

  constructor() {}

  emitHabit(habit: Habit) {
    this.habitSubject.next(habit);
  }
}
