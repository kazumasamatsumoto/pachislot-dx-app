import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CounterItemComponent } from '../shared/counter-item/counter-item.component';
import { AimJuggler } from '../models/aim-juggler';
import { MyJuggler5 } from '../models/my-juggler5';
import { FunkyJuggler } from '../models/funky-juggler';
import { HappyJuggler } from '../models/happy-juggler';
import { GogoJuggler } from '../models/gogo-juggler';
import { MisterJuggler } from '../models/mister-juggler';
import { JugglerGirls } from '../models/juggler-girls';
import { SlotMachineData } from '../models/slot-probability.interface';
import { FirestoreService } from '../services/firestore.service';
import { MatDialog } from '@angular/material/dialog';
import { SaveDialogComponent } from '../shared/save-dialog/save-dialog.component';

interface CounterState {
  totalSpins: number;
  counters: { [key: string]: number };
  selectedMachine: 'aim' | 'my' | 'funky' | 'happy' | 'gogo' | 'mister' | 'girls';
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
  private funkyJuggler: FunkyJuggler;
  private happyJuggler: HappyJuggler;
  private gogoJuggler: GogoJuggler;
  private misterJuggler: MisterJuggler;
  private jugglerGirls: JugglerGirls;
  counters: { [key: string]: number } = {};
  totalSpins = 0;
  spinsInput = 0;
  selectedMachine: 'aim' | 'my' | 'funky' | 'happy' | 'gogo' | 'mister' | 'girls' = 'aim';
  isSaving = false;
  dataSource: string = '';

  constructor(
    private firestoreService: FirestoreService,
    private dialog: MatDialog
  ) {
    this.aimJuggler = new AimJuggler();
    this.myJuggler = new MyJuggler5();
    this.funkyJuggler = new FunkyJuggler();
    this.happyJuggler = new HappyJuggler();
    this.gogoJuggler = new GogoJuggler();
    this.misterJuggler = new MisterJuggler();
    this.jugglerGirls = new JugglerGirls();
    this.slotData = this.aimJuggler;
    this.initializeCounters();
  }

  ngOnInit() {
    this.loadCounters();
  }

  selectMachine(machine: 'aim' | 'my' | 'funky' | 'happy' | 'gogo' | 'mister' | 'girls'): void {
    if (this.selectedMachine !== machine) {
      this.selectedMachine = machine;
      if (machine === 'aim') {
        this.slotData = this.aimJuggler;
        this.dataSource = this.aimJuggler.dataSource;
      } else if (machine === 'my') {
        this.slotData = this.myJuggler;
        this.dataSource = this.myJuggler.dataSource;
      } else if (machine === 'happy') {
        this.slotData = this.happyJuggler;
        this.dataSource = this.happyJuggler.dataSource;
      } else if (machine === 'gogo') {
        this.slotData = this.gogoJuggler;
        this.dataSource = this.gogoJuggler.dataSource;
      } else if (machine === 'mister') {
        this.slotData = this.misterJuggler;
        this.dataSource = this.misterJuggler.dataSource;
      } else if (machine === 'girls') {
        this.slotData = this.jugglerGirls;
        this.dataSource = this.jugglerGirls.dataSource;
      } else {
        this.slotData = this.funkyJuggler;
        this.dataSource = this.funkyJuggler.dataSource;
      }
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
        if (this.selectedMachine === 'aim') {
          this.slotData = this.aimJuggler;
        } else if (this.selectedMachine === 'my') {
          this.slotData = this.myJuggler;
        } else if (this.selectedMachine === 'happy') {
          this.slotData = this.happyJuggler;
        } else if (this.selectedMachine === 'gogo') {
          this.slotData = this.gogoJuggler;
        } else if (this.selectedMachine === 'mister') {
          this.slotData = this.misterJuggler;
        } else if (this.selectedMachine === 'girls') {
          this.slotData = this.jugglerGirls;
        } else {
          this.slotData = this.funkyJuggler;
        }
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
      '単独チェリー(1番チェリー)': '🍒',
      '単独チェリー(13番チェリー)': '🍒',
      '単独ボーナス': '💰',
      '単独BIG': '💰',
      '単独REG': '💎',
      '共通チェリー+BIG': '🍒',
      '共通チェリー+REG': '🍒',
      '単独チェリー1+BIG': '🍒',
      '単独チェリー2+BIG': '🍒',
      '単独チェリー1+BIG(1番チェリー)': '🍒',
      '単独チェリー2+BIG(13番チェリー)': '🍒',
      '単独チェリー+1枚役(1番チェリー)': '🍒',
      '単独チェリー+1枚役(13番チェリー)': '🍒',
      '単独チェリー1+1枚役+BIG': '🍒',
      '単独チェリー1+1枚役+BIG(1番チェリー)': '🍒',
      '単独チェリー1+1枚役+BIG(13番チェリー)': '🍒',
      '中段チェリー+1枚役': '🍒',
      '中段チェリー+1枚役+BIG': '🍒',
      'チェリー同時成立(表内合成)': '🍒',
      '単独1枚役': '💴',
      リプレイ: '🔄',
      ピエロ: '🤡',
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
