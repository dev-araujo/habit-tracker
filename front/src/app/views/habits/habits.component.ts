import { NgFor, NgStyle, AsyncPipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { DayControl, Habit } from '../../models/interfaces';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { checkedStyle } from '../../shared/utils/style';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [NgStyle, NgFor, AsyncPipe, FormsModule, MatDialogModule, NgClass],

  templateUrl: './habits.component.html',
  styleUrl: './habits.component.scss',
})
export class HabitsComponent {
  private service = inject(ServiceService);
  private dialog = inject(MatDialog);

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
    const dialogRef = this.dialog.open(ModalComponent, {
      height: '200px',
      width: '280px',
    });

    // this.service.deleteHabit(id).subscribe({
    //   next: () => {
    //     this.loadHabitData();
    //   },
    // });
  }
}
