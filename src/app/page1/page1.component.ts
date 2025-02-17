import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CounterState {
  totalSpins: number;
  grapeCount: number;
  cherryBigCount: number;
  cherryRegCount: number;
  cherryBonusCount: number;
  cherryNormalCount: number;
  bigBonusCount: number;
  regularBonusCount: number;
}

interface SettingProbability {
  setting: number;
  bigBonus: number;
  regularBonus: number;
  totalBonus: number;
  grape: number;
  cherryBig: number;
  cherryReg: number;
  cherryBonus: number;
  cherryNormal: number;
}

@Component({
  selector: 'app-page1',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss'],
})
export class Page1Component implements OnInit {
  // 各カウンター
  totalSpins = 0;
  spinsInput = '';
  grapeCount = 0;
  cherryBigCount = 0;
  cherryRegCount = 0;
  cherryBonusCount = 0;
  cherryNormalCount = 0;
  bigBonusCount = 0;
  regularBonusCount = 0;

  // 設定別確率テーブル
  readonly settingTable: SettingProbability[] = [
    {
      setting: 1,
      bigBonus: 1 / 273.1,
      regularBonus: 1 / 409.6,
      totalBonus: 1 / 163.8,
      grape: 1 / 5.9,
      cherryBig: 1 / 1365.33,
      cherryReg: 1 / 1092.27,
      cherryBonus: 1 / 606.82,
      cherryNormal: 1 / 38.1,
    },
    {
      setting: 2,
      bigBonus: 1 / 270.8,
      regularBonus: 1 / 385.5,
      totalBonus: 1 / 159.1,
      grape: 1 / 5.85,
      cherryBig: 1 / 1365.33,
      cherryReg: 1 / 1092.27,
      cherryBonus: 1 / 606.82,
      cherryNormal: 1 / 38.1,
    },
    {
      setting: 3,
      bigBonus: 1 / 266.4,
      regularBonus: 1 / 336.1,
      totalBonus: 1 / 148.6,
      grape: 1 / 5.8,
      cherryBig: 1 / 1365.33,
      cherryReg: 1 / 1040.25,
      cherryBonus: 1 / 590.41,
      cherryNormal: 1 / 36.82,
    },
    {
      setting: 4,
      bigBonus: 1 / 254.0,
      regularBonus: 1 / 290.0,
      totalBonus: 1 / 135.4,
      grape: 1 / 5.78,
      cherryBig: 1 / 1365.33,
      cherryReg: 1 / 1024.0,
      cherryBonus: 1 / 585.14,
      cherryNormal: 1 / 35.62,
    },
    {
      setting: 5,
      bigBonus: 1 / 240.1,
      regularBonus: 1 / 268.6,
      totalBonus: 1 / 126.8,
      grape: 1 / 5.76,
      cherryBig: 1 / 1337.47,
      cherryReg: 1 / 862.32,
      cherryBonus: 1 / 524.29,
      cherryNormal: 1 / 35.62,
    },
    {
      setting: 6,
      bigBonus: 1 / 229.1,
      regularBonus: 1 / 229.1,
      totalBonus: 1 / 114.6,
      grape: 1 / 5.66,
      cherryBig: 1 / 1129.93,
      cherryReg: 1 / 762.05,
      cherryBonus: 1 / 455.11,
      cherryNormal: 1 / 35.62,
    },
  ];

  ngOnInit() {
    this.loadCounters();
  }

  // LocalStorageからデータを読み込む
  private loadCounters() {
    const savedState = localStorage.getItem('counterState');
    console.log('読み込まれた状態:', savedState);
    if (savedState) {
      const state: CounterState = JSON.parse(savedState);
      this.totalSpins = state.totalSpins;
      this.grapeCount = state.grapeCount;
      this.cherryBigCount = state.cherryBigCount;
      this.cherryRegCount = state.cherryRegCount;
      this.cherryBonusCount = state.cherryBonusCount;
      this.cherryNormalCount = state.cherryNormalCount;
      this.bigBonusCount = state.bigBonusCount;
      this.regularBonusCount = state.regularBonusCount;
      console.log('状態を復元しました:', state);
    }
  }

  // LocalStorageにデータを保存
  private saveCounters() {
    const state: CounterState = {
      totalSpins: this.totalSpins,
      grapeCount: this.grapeCount,
      cherryBigCount: this.cherryBigCount,
      cherryRegCount: this.cherryRegCount,
      cherryBonusCount: this.cherryBonusCount,
      cherryNormalCount: this.cherryNormalCount,
      bigBonusCount: this.bigBonusCount,
      regularBonusCount: this.regularBonusCount,
    };
    localStorage.setItem('counterState', JSON.stringify(state));
    console.log('保存された状態:', state);
  }

  // 回転数を更新
  updateSpins() {
    const spins = parseInt(this.spinsInput);
    if (!isNaN(spins) && spins >= 0) {
      this.totalSpins = spins;
      this.saveCounters();
    }
    this.spinsInput = '';
  }

  // カウントアップメソッド
  incrementGrape() {
    console.log('ブドウカウントアップ前:', this.grapeCount);
    this.grapeCount++;
    console.log('ブドウカウントアップ後:', this.grapeCount);
    this.saveCounters();
  }

  // チェリー関連のカウントアップメソッド
  incrementCherryBig() {
    console.log('角チェリー+BIGカウントアップ前:', this.cherryBigCount);
    this.cherryBigCount++;
    console.log('角チェリー+BIGカウントアップ後:', this.cherryBigCount);
    this.saveCounters();
  }

  incrementCherryReg() {
    console.log('角チェリー+REGカウントアップ前:', this.cherryRegCount);
    this.cherryRegCount++;
    console.log('角チェリー+REGカウントアップ後:', this.cherryRegCount);
    this.saveCounters();
  }

  incrementCherryBonus() {
    console.log('角チェリー+ボーナスカウントアップ前:', this.cherryBonusCount);
    this.cherryBonusCount++;
    console.log('角チェリー+ボーナスカウントアップ後:', this.cherryBonusCount);
    this.saveCounters();
  }

  incrementCherryNormal() {
    console.log('非重複チェリーカウントアップ前:', this.cherryNormalCount);
    this.cherryNormalCount++;
    console.log('非重複チェリーカウントアップ後:', this.cherryNormalCount);
    this.saveCounters();
  }

  incrementBigBonus() {
    console.log('ビッグボーナスカウントアップ前:', this.bigBonusCount);
    this.bigBonusCount++;
    console.log('ビッグボーナスカウントアップ後:', this.bigBonusCount);
    this.saveCounters();
  }

  incrementRegularBonus() {
    console.log('レギュラーボーナスカウントアップ前:', this.regularBonusCount);
    this.regularBonusCount++;
    console.log('レギュラーボーナスカウントアップ後:', this.regularBonusCount);
    this.saveCounters();
  }

  // 確率計算メソッド
  calculateProbability(count: number): string {
    if (this.totalSpins === 0) return '0.00%';
    return ((count / this.totalSpins) * 100).toFixed(2) + '%';
  }

  // 1/nの形式で確率を表示
  calculateProbabilityFraction(count: number): string {
    if (count === 0) return '1/Infinity';
    if (this.totalSpins === 0) return '-';
    const probability = this.totalSpins / count;
    if (!isFinite(probability)) return '1/Infinity';
    return '1/' + probability.toFixed(1);
  }

  // ビッグボーナスの設定判別
  determineBigBonusSettings(): string {
    if (this.totalSpins === 0 || this.bigBonusCount === 0) {
      return '判別不可';
    }

    const currentProb = this.totalSpins / this.bigBonusCount;
    let lowerSetting = 1;
    let upperSetting = 6;

    for (let i = 0; i < this.settingTable.length - 1; i++) {
      const lowerBound = 1 / this.settingTable[i].bigBonus;
      const upperBound = 1 / this.settingTable[i + 1].bigBonus;

      if (currentProb <= lowerBound && currentProb >= upperBound) {
        lowerSetting = this.settingTable[i].setting;
        upperSetting = this.settingTable[i + 1].setting;
        break;
      }
    }

    if (currentProb > 1 / this.settingTable[0].bigBonus) {
      return '設定1以下';
    }
    if (currentProb < 1 / this.settingTable[5].bigBonus) {
      return '設定6以上';
    }

    return `設定${lowerSetting}～${upperSetting}相当`;
  }

  // レギュラーボーナスの設定判別
  determineRegularBonusSettings(): string {
    if (this.totalSpins === 0 || this.regularBonusCount === 0) {
      return '判別不可';
    }

    const currentProb = this.totalSpins / this.regularBonusCount;
    let lowerSetting = 1;
    let upperSetting = 6;

    for (let i = 0; i < this.settingTable.length - 1; i++) {
      const lowerBound = 1 / this.settingTable[i].regularBonus;
      const upperBound = 1 / this.settingTable[i + 1].regularBonus;

      if (currentProb <= lowerBound && currentProb >= upperBound) {
        lowerSetting = this.settingTable[i].setting;
        upperSetting = this.settingTable[i + 1].setting;
        break;
      }
    }

    if (currentProb > 1 / this.settingTable[0].regularBonus) {
      return '設定1以下';
    }
    if (currentProb < 1 / this.settingTable[5].regularBonus) {
      return '設定6以上';
    }

    return `設定${lowerSetting}～${upperSetting}相当`;
  }

  // 合算の設定判別
  determineTotalBonusSettings(): string {
    if (
      this.totalSpins === 0 ||
      (this.bigBonusCount === 0 && this.regularBonusCount === 0)
    ) {
      return '判別不可';
    }

    const currentProb =
      this.totalSpins / (this.bigBonusCount + this.regularBonusCount);
    let lowerSetting = 1;
    let upperSetting = 6;

    for (let i = 0; i < this.settingTable.length - 1; i++) {
      const lowerBound = 1 / this.settingTable[i].totalBonus;
      const upperBound = 1 / this.settingTable[i + 1].totalBonus;

      if (currentProb <= lowerBound && currentProb >= upperBound) {
        lowerSetting = this.settingTable[i].setting;
        upperSetting = this.settingTable[i + 1].setting;
        break;
      }
    }

    if (currentProb > 1 / this.settingTable[0].totalBonus) {
      return '設定1以下';
    }
    if (currentProb < 1 / this.settingTable[5].totalBonus) {
      return '設定6以上';
    }

    return `設定${lowerSetting}～${upperSetting}相当`;
  }

  // ブドウの設定判別
  determineGrapeSettings(): string {
    if (this.totalSpins === 0 || this.grapeCount === 0) {
      return '判別不可';
    }

    const currentProb = this.totalSpins / this.grapeCount;
    let lowerSetting = 1;
    let upperSetting = 6;

    for (let i = 0; i < this.settingTable.length - 1; i++) {
      const lowerBound = 1 / this.settingTable[i].grape;
      const upperBound = 1 / this.settingTable[i + 1].grape;

      if (currentProb <= lowerBound && currentProb >= upperBound) {
        lowerSetting = this.settingTable[i].setting;
        upperSetting = this.settingTable[i + 1].setting;
        break;
      }
    }

    if (currentProb > 1 / this.settingTable[0].grape) {
      return '設定1以下';
    }
    if (currentProb < 1 / this.settingTable[5].grape) {
      return '設定6以上';
    }

    return `設定${lowerSetting}～${upperSetting}相当`;
  }

  // チェリー関連の設定判別
  determineCherryBigSettings(): string {
    if (this.totalSpins === 0 || this.cherryBigCount === 0) {
      return '判別不可';
    }

    const currentProb = this.totalSpins / this.cherryBigCount;

    // 設定1の理論値より悪い場合
    if (currentProb > 1365.33) {
      return '設定1以下';
    }
    // 設定6の理論値より良い場合
    if (currentProb < 1129.93) {
      return '設定6以上';
    }

    // 設定5-6の間
    if (currentProb >= 1129.93 && currentProb <= 1337.47) {
      return '設定5～6相当';
    }
    // 設定1-5の間（設定1-4は同一確率）
    if (currentProb > 1337.47 && currentProb <= 1365.33) {
      return '設定1～5相当';
    }

    return '判別不可';
  }

  // チェリー+REGの設定判別
  determineCherryRegSettings(): string {
    if (this.totalSpins === 0 || this.cherryRegCount === 0) {
      return '判別不可';
    }

    const currentProb = this.totalSpins / this.cherryRegCount;

    // 設定1の理論値より悪い場合
    if (currentProb > 1092.27) {
      return '設定1以下';
    }
    // 設定6の理論値より良い場合
    if (currentProb < 762.05) {
      return '設定6以上';
    }

    // 設定6
    if (currentProb >= 762.05 && currentProb < 862.32) {
      return '設定6相当';
    }
    // 設定5
    if (currentProb >= 862.32 && currentProb < 1024.0) {
      return '設定5相当';
    }
    // 設定4
    if (currentProb >= 1024.0 && currentProb < 1040.25) {
      return '設定4相当';
    }
    // 設定3
    if (currentProb >= 1040.25 && currentProb < 1092.27) {
      return '設定3相当';
    }
    // 設定1-2
    if (currentProb >= 1092.27) {
      return '設定1～2相当';
    }

    return '判別不可';
  }

  // チェリー+ボーナスの設定判別
  determineCherryBonusSettings(): string {
    if (this.totalSpins === 0 || this.cherryBonusCount === 0) {
      return '判別不可';
    }

    const currentProb = this.totalSpins / this.cherryBonusCount;

    // 設定1の理論値より悪い場合
    if (currentProb > 606.82) {
      return '設定1以下';
    }
    // 設定6の理論値より良い場合
    if (currentProb < 455.11) {
      return '設定6以上';
    }

    // 設定6
    if (currentProb >= 455.11 && currentProb < 524.29) {
      return '設定6相当';
    }
    // 設定5
    if (currentProb >= 524.29 && currentProb < 585.14) {
      return '設定5相当';
    }
    // 設定4
    if (currentProb >= 585.14 && currentProb < 590.41) {
      return '設定4相当';
    }
    // 設定3
    if (currentProb >= 590.41 && currentProb < 606.82) {
      return '設定3相当';
    }
    // 設定1-2
    if (currentProb >= 606.82) {
      return '設定1～2相当';
    }

    return '判別不可';
  }

  // 非重複チェリーの設定判別
  determineCherryNormalSettings(): string {
    if (this.totalSpins === 0 || this.cherryNormalCount === 0) {
      return '判別不可';
    }

    const currentProb = this.totalSpins / this.cherryNormalCount;

    // 設定1の理論値より悪い場合
    if (currentProb > 38.1) {
      return '設定1以下';
    }
    // 設定4-6の理論値より良い場合
    if (currentProb < 35.62) {
      return '設定4以上';
    }

    // 設定4-6
    if (currentProb >= 35.62 && currentProb < 36.82) {
      return '設定4～6相当';
    }
    // 設定3
    if (currentProb >= 36.82 && currentProb < 38.1) {
      return '設定3相当';
    }
    // 設定1-2
    if (currentProb >= 38.1) {
      return '設定1～2相当';
    }

    return '判別不可';
  }

  // リセットメソッド
  resetCounters() {
    this.totalSpins = 0;
    this.spinsInput = '';
    this.grapeCount = 0;
    this.cherryBigCount = 0;
    this.cherryRegCount = 0;
    this.cherryBonusCount = 0;
    this.cherryNormalCount = 0;
    this.bigBonusCount = 0;
    this.regularBonusCount = 0;
    this.saveCounters();
  }
}
