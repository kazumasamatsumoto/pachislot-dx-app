import {
  SlotMachineData,
  SlotSymbolProbabilities,
} from './slot-probability.interface';

/**
 * マイジャグラーの子役確率データ
 * 出典: すろぱちくえすと
 * @see https://www.slopachi-quest.com/article/my-juggler5-settei/
 */
export class MyJuggler5 implements SlotMachineData {
  machineName: string;
  symbols: SlotSymbolProbabilities[];
  dataSource: string;

  constructor() {
    this.machineName = 'マイジャグラー';
    this.dataSource = 'すろぱちくえすと (https://www.slopachi-quest.com/article/my-juggler5-settei/)';
    this.symbols = [
      {
        symbolName: 'リプレイ',
        probabilities: [
          { setting: 1, probability: 1 / 7.29 },
          { setting: 2, probability: 1 / 7.30 },
          { setting: 3, probability: 1 / 7.29 },
          { setting: 4, probability: 1 / 7.31 },
          { setting: 5, probability: 1 / 7.30 },
          { setting: 6, probability: 1 / 7.30 },
        ],
      },
      {
        symbolName: 'ブドウ',
        probabilities: [
          { setting: 1, probability: 1 / 5.88 },
          { setting: 2, probability: 1 / 5.84 },
          { setting: 3, probability: 1 / 5.80 },
          { setting: 4, probability: 1 / 5.75 },
          { setting: 5, probability: 1 / 5.75 },
          { setting: 6, probability: 1 / 5.65 },
        ],
      },
      {
        symbolName: '共通チェリー(ボーナス非当選)',
        probabilities: [
          { setting: 1, probability: 1 / 38.26 },
          { setting: 2, probability: 1 / 38.06 },
          { setting: 3, probability: 1 / 36.80 },
          { setting: 4, probability: 1 / 35.59 },
          { setting: 5, probability: 1 / 35.62 },
          { setting: 6, probability: 1 / 35.67 },
        ],
      },
      {
        symbolName: '共通チェリー(ボーナス同時成立)',
        probabilities: [
          { setting: 1, probability: 1 / 623.86 },
          { setting: 2, probability: 1 / 611.92 },
          { setting: 3, probability: 1 / 602.54 },
          { setting: 4, probability: 1 / 570.59 },
          { setting: 5, probability: 1 / 508.07 },
          { setting: 6, probability: 1 / 458.75 },
        ],
      },
      {
        symbolName: '単独チェリー1(5番チェリー)',
        probabilities: [
          { setting: 1, probability: 1 / 7382.34 },
          { setting: 2, probability: 1 / 7065.65 },
          { setting: 3, probability: 1 / 7126.39 },
          { setting: 4, probability: 1 / 7332.17 },
          { setting: 5, probability: 1 / 7116.99 },
          { setting: 6, probability: 1 / 7737.73 },
        ],
      },
      {
        symbolName: '単独チェリー2(14番チェリー)',
        probabilities: [
          { setting: 1, probability: 1 / 7103.94 },
          { setting: 2, probability: 1 / 7341.06 },
          { setting: 3, probability: 1 / 6953.91 },
          { setting: 4, probability: 1 / 6922.76 },
          { setting: 5, probability: 1 / 6982.71 },
          { setting: 6, probability: 1 / 7292.31 },
        ],
      },
      {
        symbolName: 'ピエロ',
        probabilities: [
          { setting: 1, probability: 1 / 1007.55 },
          { setting: 2, probability: 1 / 1010.87 },
          { setting: 3, probability: 1 / 1003.28 },
          { setting: 4, probability: 1 / 1020.03 },
          { setting: 5, probability: 1 / 1019.33 },
          { setting: 6, probability: 1 / 1024.33 },
        ],
      },
      {
        symbolName: 'ベル',
        probabilities: [
          { setting: 1, probability: 1 / 1012.59 },
          { setting: 2, probability: 1 / 1008.45 },
          { setting: 3, probability: 1 / 1025.90 },
          { setting: 4, probability: 1 / 1044.25 },
          { setting: 5, probability: 1 / 1007.67 },
          { setting: 6, probability: 1 / 1045.96 },
        ],
      },
      {
        symbolName: '単独チェリー1+1枚役(5番チェリー)',
        probabilities: [
          { setting: 1, probability: 1 / 16087.44 },
          { setting: 2, probability: 1 / 17284.01 },
          { setting: 3, probability: 1 / 16952.85 },
          { setting: 4, probability: 1 / 15323.41 },
          { setting: 5, probability: 1 / 17133.50 },
          { setting: 6, probability: 1 / 17628.99 },
        ],
      },
      {
        symbolName: '単独チェリー2+1枚役(14番チェリー)',
        probabilities: [
          { setting: 1, probability: 1 / 17911.25 },
          { setting: 2, probability: 1 / 15171.52 },
          { setting: 3, probability: 1 / 16392.84 },
          { setting: 4, probability: 1 / 16733.54 },
          { setting: 5, probability: 1 / 17735.64 },
          { setting: 6, probability: 1 / 15653.33 },
        ],
      },
      {
        symbolName: '共通中段チェリー+1枚役',
        probabilities: [
          { setting: 1, probability: 1 / 32712.16 },
          { setting: 2, probability: 1 / 38194.04 },
          { setting: 3, probability: 1 / 34117.61 },
          { setting: 4, probability: 1 / 31532.57 },
          { setting: 5, probability: 1 / 37508.48 },
          { setting: 6, probability: 1 / 35372.46 },
        ],
      },
      {
        symbolName: '単独1枚役',
        probabilities: [
          { setting: 1, probability: 1 / 11263.77 },
          { setting: 2, probability: 1 / 10503.36 },
          { setting: 3, probability: 1 / 10809.54 },
          { setting: 4, probability: 1 / 11388.59 },
          { setting: 5, probability: 1 / 11080.35 },
          { setting: 6, probability: 1 / 11348.66 },
        ],
      },
      {
        symbolName: '単独BIG',
        probabilities: [
          { setting: 1, probability: 1 / 410.31 },
          { setting: 2, probability: 1 / 409.98 },
          { setting: 3, probability: 1 / 398.16 },
          { setting: 4, probability: 1 / 377.07 },
          { setting: 5, probability: 1 / 352.93 },
          { setting: 6, probability: 1 / 342.17 },
        ],
      },
      {
        symbolName: '単独REG',
        probabilities: [
          { setting: 1, probability: 1 / 662.49 },
          { setting: 2, probability: 1 / 601.71 },
          { setting: 3, probability: 1 / 489.14 },
          { setting: 4, probability: 1 / 413.30 },
          { setting: 5, probability: 1 / 395.81 },
          { setting: 6, probability: 1 / 330.34 },
        ],
      },
      {
        symbolName: '共通チェリー+BIG',
        probabilities: [
          { setting: 1, probability: 1 / 1411.61 },
          { setting: 2, probability: 1 / 1388.70 },
          { setting: 3, probability: 1 / 1363.34 },
          { setting: 4, probability: 1 / 1287.80 },
          { setting: 5, probability: 1 / 1227.34 },
          { setting: 6, probability: 1 / 1115.58 },
        ],
      },
      {
        symbolName: '共通チェリー+REG',
        probabilities: [
          { setting: 1, probability: 1 / 1104.51 },
          { setting: 2, probability: 1 / 1080.46 },
          { setting: 3, probability: 1 / 1065.34 },
          { setting: 4, probability: 1 / 1009.65 },
          { setting: 5, probability: 1 / 854.17 },
          { setting: 6, probability: 1 / 766.59 },
        ],
      },
      {
        symbolName: '単独チェリー+BIG(5番チェリー)',
        probabilities: [
          { setting: 1, probability: 1 / 7382.34 },
          { setting: 2, probability: 1 / 7065.65 },
          { setting: 3, probability: 1 / 7126.39 },
          { setting: 4, probability: 1 / 7332.17 },
          { setting: 5, probability: 1 / 7116.99 },
          { setting: 6, probability: 1 / 7737.73 },
        ],
      },
      {
        symbolName: '単独チェリー+BIG(14番チェリー)',
        probabilities: [
          { setting: 1, probability: 1 / 7103.94 },
          { setting: 2, probability: 1 / 7341.06 },
          { setting: 3, probability: 1 / 6953.91 },
          { setting: 4, probability: 1 / 6922.76 },
          { setting: 5, probability: 1 / 6982.71 },
          { setting: 6, probability: 1 / 7292.31 },
        ],
      },
      {
        symbolName: '単独チェリー+1枚役+BIG(5番チェリー)',
        probabilities: [
          { setting: 1, probability: 1 / 16087.44 },
          { setting: 2, probability: 1 / 17284.01 },
          { setting: 3, probability: 1 / 16952.85 },
          { setting: 4, probability: 1 / 15323.41 },
          { setting: 5, probability: 1 / 17133.50 },
          { setting: 6, probability: 1 / 17628.99 },
        ],
      },
      {
        symbolName: '単独チェリー+1枚役+BIG(14番チェリー)',
        probabilities: [
          { setting: 1, probability: 1 / 17911.25 },
          { setting: 2, probability: 1 / 15171.52 },
          { setting: 3, probability: 1 / 16392.84 },
          { setting: 4, probability: 1 / 16733.54 },
          { setting: 5, probability: 1 / 17735.64 },
          { setting: 6, probability: 1 / 15653.33 },
        ],
      },
      {
        symbolName: '共通中段チェリー+1枚役+BIG',
        probabilities: [
          { setting: 1, probability: 1 / 32712.16 },
          { setting: 2, probability: 1 / 38194.04 },
          { setting: 3, probability: 1 / 34117.61 },
          { setting: 4, probability: 1 / 31532.57 },
          { setting: 5, probability: 1 / 37508.48 },
          { setting: 6, probability: 1 / 35372.46 },
        ],
      },
      {
        symbolName: '1枚役+BIG',
        probabilities: [
          { setting: 1, probability: 1 / 11263.77 },
          { setting: 2, probability: 1 / 10503.36 },
          { setting: 3, probability: 1 / 10809.54 },
          { setting: 4, probability: 1 / 11388.59 },
          { setting: 5, probability: 1 / 11080.35 },
          { setting: 6, probability: 1 / 11348.66 },
        ],
      },
    ];
  }
}
