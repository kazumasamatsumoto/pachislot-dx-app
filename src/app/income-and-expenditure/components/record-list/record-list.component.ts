import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { EventRecord } from '../../../services/firestore.service';

@Component({
  selector: 'app-record-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule
  ],
  templateUrl: './record-list.component.html',
  styleUrl: './record-list.component.scss'
})
export class RecordListComponent {
  @Input() displayedRecords: EventRecord[] = [];
  @Input() currentDate: Date = new Date();
  @Input() isLoading: boolean = false;
  
  displayedColumns: string[] = ['date', 'storeName', 'eventType', 'investment', 'recovery', 'profit'];
  
  calculateProfit(investment: number, recovery: number): number {
    return recovery - investment;
  }
} 