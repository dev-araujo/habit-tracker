import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Habit, ResEdited } from '../models/interfaces';
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

  updateHabit(habit: Habit): Observable<ResEdited> {
    return this.http.put<ResEdited>(`${this.apiUrl}/${habit.id}`, habit);
  }

  deleteHabit(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  emitHabit(habit: string) {
    this.habitSubject.next(habit);
  }
}
