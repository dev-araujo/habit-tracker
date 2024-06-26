import { Component, inject } from '@angular/core';
import { ServiceService } from '../../../service/service.service';
import { JsonPipe, NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgStyle, NgClass, JsonPipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private service = inject(ServiceService);
  placeholderContent = 'Add new habit';
  isError = false;
  newHabitValue = '';

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

  onInputChange(value: string) {
    this.newHabitValue = value;
  }
}
