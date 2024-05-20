import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Habit } from '../models/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private apiUrl = 'http://localhost:3000/habits';
  private habitSubject = new Subject<string>();
  habitShared$ = this.habitSubject.asObservable();

  private http = inject(HttpClient);

  createNewHabit(habit: string): Observable<Habit> {
    return this.http.post<Habit>(this.apiUrl, { name: habit });
  }

  getHabits(): Observable<Habit[]> {
    return this.http.get<Habit[]>(this.apiUrl);
  }

  updateHabit(habit: Habit): Observable<any> {
    return this.http.put(`${this.apiUrl}/${habit.id}`, habit);
  }

  emitHabit(habit: string) {
    this.habitSubject.next(habit);
  }
}
