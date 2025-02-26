import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

import { FirestoreService, EventRecord } from '../services/firestore.service';
import { CalendarComponent } from './components/calendar/calendar.component';
import { RecordFormComponent } from './components/record-form/record-form.component';
import { RecordListComponent } from './components/record-list/record-list.component';
import { ProfitChartComponent } from './components/profit-chart/profit-chart.component';

// カレンダー日付の型定義
interface CalendarDay {
  date: Date;
  otherMonth: boolean;
  isToday: boolean;
  hasRecords: boolean;
  profit: number | null;
}

@Component({
  selector: 'app-income-and-expenditure',
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
    MatNativeDateModule,
    MatTableModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    CalendarComponent,
    RecordFormComponent,
    RecordListComponent,
    ProfitChartComponent,
  ],
  templateUrl: './income-and-expenditure.component.html',
  styleUrls: ['./income-and-expenditure.component.scss'],
})
export class IncomeAndExpenditureComponent implements OnInit {
  selectedDate: Date = new Date();
  currentDate: Date = new Date();
  newRecord: EventRecord = {
    date: new Date(),
    investment: 0,
    recovery: 0,
    storeName: '',
    eventType: '',
  };
  records: EventRecord[] = [];
  eventTypes: string[] = ['通常営業', 'イベント', '特別営業', 'その他'];
  displayedColumns: string[] = [
    'date',
    'storeName',
    'eventType',
    'investment',
    'recovery',
    'profit',
  ];
  isLoading: boolean = false;
  displayedRecords: EventRecord[] = [];

  constructor(
    private firestoreService: FirestoreService,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    try {
      // Firestoreからデータを取得
      this.records = await this.firestoreService.getShushiRecords();
      // 表示中の月のレコードをフィルタリング
      this.filterRecordsByMonth();
    } catch (error) {
      console.error('データの取得中にエラーが発生しました:', error);
      this.snackBar.open('データの取得に失敗しました', '閉じる', {
        duration: 3000,
      });
    } finally {
      this.isLoading = false;
    }
  }

  // 表示中の月のレコードをフィルタリングして日付順に並べ替え
  filterRecordsByMonth(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    // 現在表示中の月のレコードをフィルタリング
    const filteredRecords = this.records.filter((record) => {
      const recordDate = new Date(record.date);
      return (
        recordDate.getMonth() === month && recordDate.getFullYear() === year
      );
    });

    // 日付の昇順（若い順）に並べ替え
    this.displayedRecords = filteredRecords.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });
  }

  // 日付を選択
  selectDate(date: Date): void {
    this.selectedDate = date;
    this.newRecord.date = new Date(date);
  }

  onDateSelected(event: any): void {
    this.selectedDate = event.value;
    this.newRecord.date = event.value;
  }

  async saveRecord(): Promise<void> {
    if (!this.newRecord.storeName || !this.newRecord.eventType) {
      this.snackBar.open('店名とイベントの種類は必須です', '閉じる', {
        duration: 3000,
      });
      return;
    }

    this.isLoading = true;
    try {
      // Firestoreにデータを保存
      const recordId = await this.firestoreService.saveShushiRecord(
        this.newRecord
      );

      // 保存したレコードをリストに追加（IDを含む）
      const savedRecord: EventRecord = {
        ...this.newRecord,
        id: recordId,
      };
      this.records.unshift(savedRecord);

      // 表示中の月のレコードを更新
      this.filterRecordsByMonth();

      this.snackBar.open('データが保存されました', '閉じる', {
        duration: 2000,
      });

      // フォームをリセット
      this.newRecord = {
        date: this.selectedDate,
        investment: 0,
        recovery: 0,
        storeName: '',
        eventType: '',
      };
    } catch (error) {
      console.error('データの保存中にエラーが発生しました:', error);
      this.snackBar.open('データの保存に失敗しました', '閉じる', {
        duration: 3000,
      });
    } finally {
      this.isLoading = false;
    }
  }

  calculateProfit(investment: number, recovery: number): number {
    return recovery - investment;
  }

  // 月が変更されたときのメソッド
  onMonthChanged(date: Date): void {
    this.currentDate = date;
    this.filterRecordsByMonth();
  }
}
