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
  incrementCount(type: string): void {
    switch (type) {
      case 'grape':
        this.grapeCount++;
        break;
      case 'cherryBig':
        this.cherryBigCount++;
        break;
      case 'cherryReg':
        this.cherryRegCount++;
        break;
      case 'cherryBonus':
        this.cherryBonusCount++;
        break;
      case 'cherryNormal':
        this.cherryNormalCount++;
        break;
      case 'bigBonus':
        this.bigBonusCount++;
        break;
      case 'regularBonus':
        this.regularBonusCount++;
        break;
    }
  }

  // 入力検証メソッド
  validateInput(type: string): void {
    switch (type) {
      case 'grape':
        this.grapeCount = Math.max(0, this.grapeCount || 0);
        break;
      case 'cherryBig':
        this.cherryBigCount = Math.max(0, this.cherryBigCount || 0);
        break;
      case 'cherryReg':
        this.cherryRegCount = Math.max(0, this.cherryRegCount || 0);
        break;
      case 'cherryBonus':
        this.cherryBonusCount = Math.max(0, this.cherryBonusCount || 0);
        break;
      case 'cherryNormal':
        this.cherryNormalCount = Math.max(0, this.cherryNormalCount || 0);
        break;
      case 'bigBonus':
        this.bigBonusCount = Math.max(0, this.bigBonusCount || 0);
        break;
      case 'regularBonus':
        this.regularBonusCount = Math.max(0, this.regularBonusCount || 0);
        break;
    }
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
