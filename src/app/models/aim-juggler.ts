import {
  SlotMachineData,
  SlotSymbolProbabilities,
} from './slot-probability.interface';

/**
 * アイムジャグラーの子役確率データ
 * 出典: すろぱちくえすと
 * @see https://www.slopachi-quest.com/article/im-juggler-ex-6gouki/
 */
export class AimJuggler implements SlotMachineData {
  machineName: string;
  symbols: SlotSymbolProbabilities[];
  dataSource: string;

  constructor() {
    this.machineName = 'アイムジャグラー';
    this.dataSource = 'すろぱちくえすと (https://www.slopachi-quest.com/article/im-juggler-ex-6gouki/)';
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
