import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { EventRecord } from '../../../services/firestore.service';

@Component({
  selector: 'app-record-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatNativeDateModule
  ],
  templateUrl: './record-form.component.html',
  styleUrl: './record-form.component.scss'
})
export class RecordFormComponent {
  @Input() newRecord: EventRecord = {
    date: new Date(),
    investment: 0,
    recovery: 0,
    storeName: '',
    eventType: ''
  };
  @Input() isLoading: boolean = false;
  @Input() eventTypes: string[] = [];
  
  @Output() saveRecord = new EventEmitter<void>();
  @Output() dateChange = new EventEmitter<any>();
  
  onDateSelected(event: any): void {
    this.dateChange.emit(event);
  }
  
  onSaveRecord(): void {
    this.saveRecord.emit();
  }
} 