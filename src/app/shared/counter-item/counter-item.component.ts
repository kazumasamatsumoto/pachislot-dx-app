import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter-item',
  templateUrl: './counter-item.component.html',
  styleUrls: ['./counter-item.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CounterItemComponent {
  @Input() icon: string = '';
  @Input() label: string = '';
  @Input() count: number = 0;
  @Input() countKey: string = '';
  @Output() countChange = new EventEmitter<number>();

  incrementCount(): void {
    this.count++;
    this.countChange.emit(this.count);
  }

  validateInput(): void {
    if (this.count < 0) {
      this.count = 0;
    }
    this.countChange.emit(this.count);
  }
}
