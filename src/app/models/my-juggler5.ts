import {
  SlotMachineData,
  SlotSymbolProbabilities,
} from './slot-probability.interface';

export class MyJuggler5 implements SlotMachineData {
  machineName = 'マイジャグラー5';

  symbols: SlotSymbolProbabilities[] = [
    {
      symbolName: 'リプレイ',
      probabilities: [
        { setting: 1, probability: 1 / 7.29 },
        { setting: 2, probability: 1 / 7.3 },
        { setting: 3, probability: 1 / 7.29 },
        { setting: 4, probability: 1 / 7.31 },
        { setting: 5, probability: 1 / 7.3 },
        { setting: 6, probability: 1 / 7.3 },
      ],
    },
    {
      symbolName: 'ブドウ',
      probabilities: [
        { setting: 1, probability: 1 / 5.88 },
        { setting: 2, probability: 1 / 5.84 },
        { setting: 3, probability: 1 / 5.8 },
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
        { setting: 3, probability: 1 / 36.8 },
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
      symbolName: 'ビエロ',
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
        { setting: 3, probability: 1 / 1025.9 },
        { setting: 4, probability: 1 / 1044.25 },
        { setting: 5, probability: 1 / 1007.67 },
        { setting: 6, probability: 1 / 1045.96 },
      ],
    },
    {
      symbolName: 'ビッグボーナス',
      probabilities: [
        { setting: 1, probability: 1 / 273.1 },
        { setting: 2, probability: 1 / 270.8 },
        { setting: 3, probability: 1 / 266.4 },
        { setting: 4, probability: 1 / 254.0 },
        { setting: 5, probability: 1 / 240.1 },
        { setting: 6, probability: 1 / 229.1 },
      ],
    },
    {
      symbolName: 'レギュラーボーナス',
      probabilities: [
        { setting: 1, probability: 1 / 409.6 },
        { setting: 2, probability: 1 / 385.5 },
        { setting: 3, probability: 1 / 336.1 },
        { setting: 4, probability: 1 / 290.0 },
        { setting: 5, probability: 1 / 268.6 },
        { setting: 6, probability: 1 / 229.1 },
      ],
    },
  ];
}
