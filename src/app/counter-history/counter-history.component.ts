import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CounterItemComponent } from '../shared/counter-item/counter-item.component';
import { AimJuggler } from '../models/aim-juggler';
import { MyJuggler5 } from '../models/my-juggler5';
import { SlotMachineData } from '../models/slot-probability.interface';
import { FirestoreService } from '../services/firestore.service';
import { MatDialog } from '@angular/material/dialog';
import { SaveDialogComponent } from '../shared/save-dialog/save-dialog.component';

interface CounterState {
  totalSpins: number;
  counters: { [key: string]: number };
  selectedMachine: 'aim' | 'my';
}

@Component({
  selector: 'app-counter-history',
  standalone: true,
  imports: [CommonModule, FormsModule, CounterItemComponent],
  templateUrl: './counter-history.component.html',
  styleUrls: ['./counter-history.component.scss'],
})
export class CounterHistoryComponent implements OnInit {
  slotData: SlotMachineData;
  private aimJuggler: AimJuggler;
  private myJuggler: MyJuggler5;
  counters: { [key: string]: number } = {};
  totalSpins = 0;
  spinsInput = 0;
  selectedMachine: 'aim' | 'my' = 'aim';
  isSaving = false;

  constructor(
    private firestoreService: FirestoreService,
    private dialog: MatDialog
  ) {
    this.aimJuggler = new AimJuggler();
    this.myJuggler = new MyJuggler5();
    this.slotData = this.aimJuggler;
    this.initializeCounters();
  }

  ngOnInit() {
    this.loadCounters();
  }

  selectMachine(machine: 'aim' | 'my'): void {
    if (this.selectedMachine !== machine) {
      this.selectedMachine = machine;
      this.slotData = machine === 'aim' ? this.aimJuggler : this.myJuggler;
      this.counters = {};
      this.totalSpins = 0;
      this.spinsInput = 0;
      this.initializeCounters();
      this.saveCounters();
    }
  }

  private initializeCounters() {
    this.counters = {};
    this.slotData.symbols.forEach((symbol) => {
      this.counters[symbol.symbolName] = 0;
    });
  }

  private loadCounters() {
    const savedState = localStorage.getItem('counterState');
    if (savedState) {
      try {
        const state: CounterState = JSON.parse(savedState);
        this.totalSpins = state.totalSpins || 0;
        this.selectedMachine = state.selectedMachine || 'aim';
        this.slotData =
          this.selectedMachine === 'aim' ? this.aimJuggler : this.myJuggler;
        this.initializeCounters();
        if (state.counters) {
          this.slotData.symbols.forEach((symbol) => {
            if (state.counters[symbol.symbolName] !== undefined) {
              this.counters[symbol.symbolName] =
                state.counters[symbol.symbolName];
            }
          });
        }
      } catch (error) {
        this.initializeCounters();
      }
    }
  }

  private saveCounters() {
    const state: CounterState = {
      totalSpins: this.totalSpins,
      counters: this.counters,
      selectedMachine: this.selectedMachine,
    };
    localStorage.setItem('counterState', JSON.stringify(state));
  }

  getSymbolIcon(symbolName: string): string {
    const iconMap: { [key: string]: string } = {
      ブドウ: '🍇',
      チェリー: '🍒',
      レアチェリー: '🍒',
      チェリー重複BIG: '🍒',
      チェリー重複REG: '🍒',
      'チェリー(ボーナス非当選)': '🍒',
      '共通チェリー(ボーナス非当選)': '🍒',
      '共通チェリー(ボーナス同時成立)': '🍒',
      '単独チェリー1(5番チェリー)': '🍒',
      '単独チェリー2(14番チェリー)': '🍒',
      リプレイ: '🔄',
      ビエロ: '🔔',
      ベル: '🔔',
      ビッグボーナス: '💰',
      レギュラーボーナス: '💎',
    };
    return iconMap[symbolName] || '❓';
  }

  getCountKey(symbolName: string): string {
    return symbolName.replace(/[\s\u3000]/g, '_');
  }

  updateSpins(): void {
    if (this.spinsInput > 0) {
      this.totalSpins += this.spinsInput;
      this.spinsInput = 0;
      this.saveCounters();
    }
  }

  resetCounters(): void {
    Object.keys(this.counters).forEach((key) => {
      this.counters[key] = 0;
    });
    this.totalSpins = 0;
    this.saveCounters();
  }

  calculateProbabilityFraction(count: number): string {
    if (this.totalSpins === 0 || count === 0) return '-';
    return `1/${Math.round(this.totalSpins / count)}`;
  }

  // 確率計算メソッド
  calculateProbability(count: number): string {
    if (this.totalSpins === 0) return '0.00%';
    return ((count / this.totalSpins) * 100).toFixed(2) + '%';
  }

  // 設定推測メソッド
  estimateSetting(symbolName: string, count: number): string {
    if (this.totalSpins === 0 || count === 0) return '-';

    const currentProbability = count / this.totalSpins;
    const symbol = this.slotData.symbols.find(
      (s) => s.symbolName === symbolName
    );
    if (!symbol) return '-';

    const probabilities = symbol.probabilities;
    const setting1Prob = probabilities[0].probability;
    const setting2Prob = probabilities[1].probability;
    const setting3Prob = probabilities[2].probability;
    const setting4Prob = probabilities[3].probability;
    const setting5Prob = probabilities[4].probability;
    const setting6Prob = probabilities[5].probability;

    if (currentProbability <= setting1Prob) return '設定1以下';
    if (currentProbability <= setting2Prob) return '設定1~2の間';
    if (currentProbability <= setting3Prob) return '設定2~3の間';
    if (currentProbability <= setting4Prob) return '設定3~4の間';
    if (currentProbability <= setting5Prob) return '設定4~5の間';
    if (currentProbability <= setting6Prob) return '設定5~6の間';
    return '設定6以上';
  }

  // 確率に応じたクラスを返すメソッド
  getProbabilityClass(symbolName: string, count: number): string {
    if (this.totalSpins === 0 || count === 0) return '';

    const currentProbability = count / this.totalSpins;
    const symbol = this.slotData.symbols.find(
      (s) => s.symbolName === symbolName
    );
    if (!symbol) return '';

    const probabilities = symbol.probabilities;
    const setting1Prob = probabilities[0].probability;
    const setting6Prob = probabilities[5].probability;

    if (currentProbability <= setting1Prob) return 'low-setting';
    if (currentProbability >= setting6Prob) return 'high-setting';
    return 'mid-setting';
  }

  saveToFirestore(): void {
    const dialogRef = this.dialog.open(SaveDialogComponent, {
      width: '350px',
      data: { message: 'データを保存してリセットしますか？' },
      autoFocus: true, // 自動フォーカスを有効に
      restoreFocus: true, // ダイアログが閉じた後にフォーカスを復元
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isSaving = true;

        // 確率と設定推測のデータを計算
        const symbolsData = this.slotData.symbols.map((symbol) => {
          const symbolName = symbol.symbolName;
          const count = this.counters[symbolName] || 0;
          return {
            symbolName: symbolName,
            count: count,
            probability: this.totalSpins > 0 ? count / this.totalSpins : 0,
            probabilityPercentage: this.calculateProbability(count),
            probabilityFraction: this.calculateProbabilityFraction(count),
            estimatedSetting: this.estimateSetting(symbolName, count),
          };
        });

        const dataToSave = {
          machine: this.selectedMachine,
          totalSpins: this.totalSpins,
          symbolsData: symbolsData, // 確率と設定推測データには各シンボルのカウント数も含まれている
          date: new Date(),
        };

        this.firestoreService
          .saveCounterHistory(dataToSave)
          .then(() => {
            this.resetCounters();
            alert('データが保存されました');
          })
          .catch((error) => {
            console.error('保存エラー:', error);
            alert('データの保存に失敗しました');
          })
          .finally(() => {
            this.isSaving = false;
          });
      }
    });
  }
}
