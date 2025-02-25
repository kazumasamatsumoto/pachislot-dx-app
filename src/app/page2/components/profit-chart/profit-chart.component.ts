import { Component, Input, ViewChild, ElementRef, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRecord } from '../../../services/firestore.service';

// Chart.js関連のインポート
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-profit-chart',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './profit-chart.component.html',
  styleUrl: './profit-chart.component.scss'
})
export class ProfitChartComponent implements OnChanges, AfterViewInit {
  @ViewChild('profitChart') profitChartCanvas!: ElementRef;
  
  @Input() displayedRecords: EventRecord[] = [];
  @Input() currentDate: Date = new Date();
  
  profitChart: Chart | null = null;
  
  ngAfterViewInit(): void {
    if (this.displayedRecords.length > 0) {
      this.initChart();
    }
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['displayedRecords'] && !changes['displayedRecords'].firstChange) {
      setTimeout(() => {
        this.updateChartData();
      }, 0);
    }
  }
  
  // グラフの初期化
  initChart(): void {
    if (!this.profitChartCanvas) return;
    
    Chart.register(ChartDataLabels);
    
    const ctx = this.profitChartCanvas.nativeElement.getContext('2d');
    
    // 既存のグラフを破棄
    if (this.profitChart) {
      this.profitChart.destroy();
    }
    
    this.profitChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: '累計収支',
          data: [],
          backgroundColor: 'transparent',
          borderColor: 'blue',
          borderWidth: 2,
          pointBackgroundColor: 'blue',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'blue',
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            right: 30 // 右側のパディングを追加
          }
        },
        scales: {
          y: {
            grid: {
              color: (ctx) => {
                const value = ctx.tick.value;
                if (value === 0) {
                  return 'rgba(0, 0, 0, 0.5)';
                }
                return value < 0 ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 255, 0, 0.1)';
              }
            }
          }
        },
        plugins: {
          // @ts-ignore
          datalabels: {
            align: 'top',
            anchor: 'end',
            formatter: (value: number) => {
              return new Intl.NumberFormat('ja-JP', { 
                style: 'currency', 
                currency: 'JPY',
                maximumFractionDigits: 0,
                signDisplay: value >= 0 ? 'always' : 'auto'
              }).format(value);
            },
            font: {
              weight: 'bold',
              size: 11
            },
            // @ts-ignore
            color: (context) => {
              // 型安全のためにnumberに変換
              const value = Number(context.dataset.data[context.dataIndex]);
              return !isNaN(value) && value >= 0 ? '#0d47a1' : '#b71c1c';
            }
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const value = tooltipItem.parsed.y;
                return new Intl.NumberFormat('ja-JP', { 
                  style: 'currency', 
                  currency: 'JPY',
                  signDisplay: value >= 0 ? 'always' : 'auto'
                }).format(value);
              }
            }
          }
        }
      }
    });
    
    this.updateChartData();
  }

  // グラフデータを更新するメソッド
  updateChartData(): void {
    if (this.displayedRecords.length === 0) {
      return;
    }
    
    // 初回の場合はグラフを初期化
    if (!this.profitChart && this.profitChartCanvas) {
      this.initChart();
    }
    
    if (!this.profitChart) return;
    
    // 日付ごとにグループ化
    const groupedByDate = new Map<string, EventRecord[]>();
    
    this.displayedRecords.forEach(record => {
      const dateStr = new Date(record.date).toISOString().split('T')[0];
      if (!groupedByDate.has(dateStr)) {
        groupedByDate.set(dateStr, []);
      }
      groupedByDate.get(dateStr)?.push(record);
    });
    
    // 日付でソート
    const sortedDates = Array.from(groupedByDate.keys()).sort();
    
    // 累積収支を計算
    const labels: string[] = [];
    const data: number[] = [];
    let cumulativeProfit = 0;
    
    sortedDates.forEach(dateStr => {
      const records = groupedByDate.get(dateStr) || [];
      const dailyProfit = records.reduce((sum, record) => {
        return sum + this.calculateProfit(record.investment, record.recovery);
      }, 0);
      
      cumulativeProfit += dailyProfit;
      
      // 日本語形式の日付に変換
      const date = new Date(dateStr);
      const formattedDate = `${date.getDate()}日`;
      
      labels.push(formattedDate);
      data.push(cumulativeProfit);
    });
    
    // グラフデータを更新
    this.profitChart.data.labels = labels;
    this.profitChart.data.datasets[0].data = data;
    this.profitChart.update();
  }
  
  calculateProfit(investment: number, recovery: number): number {
    return recovery - investment;
  }
} 