import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EventRecord } from '../../../services/firestore.service';

// カレンダー日付の型定義
export interface CalendarDay {
  date: Date;
  otherMonth: boolean;
  isToday: boolean;
  hasRecords: boolean;
  profit: number | null;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnChanges {
  @Input() records: EventRecord[] = [];
  @Input() currentDate: Date = new Date();
  @Input() isLoading: boolean = false;
  
  @Output() dateSelected = new EventEmitter<Date>();
  @Output() monthChanged = new EventEmitter<Date>();
  
  calendarDays: CalendarDay[] = [];
  weekDays: string[] = ['日', '月', '火', '水', '木', '金', '土'];
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['records'] || changes['currentDate']) {
      this.generateCalendar();
    }
  }
  
  // カレンダーを生成するメソッド
  generateCalendar(): void {
    this.calendarDays = [];
    
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    // 月の最初の日を取得
    const firstDay = new Date(year, month, 1);
    // 月の最後の日を取得
    const lastDay = new Date(year, month + 1, 0);
    
    // 前月の日を追加
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      this.calendarDays.push(this.createCalendarDay(date, true));
    }
    
    // 当月の日を追加
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      this.calendarDays.push(this.createCalendarDay(date, false));
    }
    
    // 翌月の日を追加（6週間分になるように）
    const remainingDays = 42 - this.calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      this.calendarDays.push(this.createCalendarDay(date, true));
    }
  }
  
  // カレンダーの日付オブジェクトを作成
  createCalendarDay(date: Date, otherMonth: boolean): CalendarDay {
    const today = new Date();
    const isToday = date.getDate() === today.getDate() && 
                    date.getMonth() === today.getMonth() && 
                    date.getFullYear() === today.getFullYear();
    
    // その日の記録を取得
    const dayRecords = this.records.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate.getDate() === date.getDate() && 
             recordDate.getMonth() === date.getMonth() && 
             recordDate.getFullYear() === date.getFullYear();
    });
    
    // 収支を計算
    let profit = null;
    if (dayRecords.length > 0) {
      profit = dayRecords.reduce((sum, record) => {
        return sum + this.calculateProfit(record.investment, record.recovery);
      }, 0);
    }
    
    return {
      date,
      otherMonth,
      isToday,
      hasRecords: dayRecords.length > 0,
      profit
    };
  }
  
  // 前月へ
  prevMonth(): void {
    const newDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1,
      1
    );
    this.monthChanged.emit(newDate);
  }
  
  // 翌月へ
  nextMonth(): void {
    const newDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      1
    );
    this.monthChanged.emit(newDate);
  }
  
  // 日付を選択
  selectDate(date: Date): void {
    this.dateSelected.emit(date);
  }
  
  calculateProfit(investment: number, recovery: number): number {
    return recovery - investment;
  }
} 