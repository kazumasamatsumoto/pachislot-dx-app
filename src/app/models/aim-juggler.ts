import {
  SlotMachineData,
  SlotSymbolProbabilities,
} from './slot-probability.interface';

export class AimJuggler implements SlotMachineData {
  machineName: string;
  symbols: SlotSymbolProbabilities[];

  constructor() {
    this.machineName = 'アイムジャグラー';
    this.symbols = [
      {
        symbolName: 'ブドウ',
        probabilities: [
          { setting: 1, probability: 1 / 6.02 },
          { setting: 2, probability: 1 / 6.02 },
          { setting: 3, probability: 1 / 6.02 },
          { setting: 4, probability: 1 / 6.02 },
          { setting: 5, probability: 1 / 6.02 },
          { setting: 6, probability: 1 / 5.78 },
        ],
      },
      {
        symbolName: 'チェリー',
        probabilities: [
          { setting: 1, probability: 1 / 35.62 },
          { setting: 2, probability: 1 / 35.62 },
          { setting: 3, probability: 1 / 35.62 },
          { setting: 4, probability: 1 / 35.62 },
          { setting: 5, probability: 1 / 35.62 },
          { setting: 6, probability: 1 / 35.62 },
        ],
      },
      {
        symbolName: 'レアチェリー',
        probabilities: [
          { setting: 1, probability: 1 / 6553.6 },
          { setting: 2, probability: 1 / 6553.6 },
          { setting: 3, probability: 1 / 6553.6 },
          { setting: 4, probability: 1 / 5461.33 },
          { setting: 5, probability: 1 / 5461.33 },
          { setting: 6, probability: 1 / 5461.33 },
        ],
      },
      {
        symbolName: 'チェリー重複BIG',
        probabilities: [
          { setting: 1, probability: 1 / 1129.93 },
          { setting: 2, probability: 1 / 1129.93 },
          { setting: 3, probability: 1 / 1129.93 },
          { setting: 4, probability: 1 / 1092.27 },
          { setting: 5, probability: 1 / 1092.27 },
          { setting: 6, probability: 1 / 1092.27 },
        ],
      },
      {
        symbolName: 'チェリー重複REG',
        probabilities: [
          { setting: 1, probability: 1 / 1456.36 },
          { setting: 2, probability: 1 / 1310.72 },
          { setting: 3, probability: 1 / 1092.27 },
          { setting: 4, probability: 1 / 1057.03 },
          { setting: 5, probability: 1 / 851.12 },
          { setting: 6, probability: 1 / 851.12 },
        ],
      },
      {
        symbolName: 'ビッグボーナス',
        probabilities: [
          { setting: 1, probability: 1 / 273.1 },
          { setting: 2, probability: 1 / 269.7 },
          { setting: 3, probability: 1 / 269.7 },
          { setting: 4, probability: 1 / 259.0 },
          { setting: 5, probability: 1 / 259.0 },
          { setting: 6, probability: 1 / 255.0 },
        ],
      },
      {
        symbolName: 'レギュラーボーナス',
        probabilities: [
          { setting: 1, probability: 1 / 439.8 },
          { setting: 2, probability: 1 / 399.6 },
          { setting: 3, probability: 1 / 331.0 },
          { setting: 4, probability: 1 / 315.1 },
          { setting: 5, probability: 1 / 255.0 },
          { setting: 6, probability: 1 / 255.0 },
        ],
      },
    ];
  }
}
