import { Component } from '@angular/core';
import { ServiceService } from '../../../service/service.service';
import { Habit } from '../../../models/interfaces';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  placeholderContent = 'Add new habit';
  isError = false;
  constructor(private service: ServiceService) {}

  addHabit(habitName: string) {
    if (!habitName) {
      this.isError = true;
      this.placeholderContent = 'Please, add a valid new habit';
      return;
    }
    this.service.emitHabit(habitName);
    this.resetPlaceholder();
  }

  resetPlaceholder() {
    this.isError = false;

    this.placeholderContent = 'Add new habit';
  }
}