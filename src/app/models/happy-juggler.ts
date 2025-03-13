import {
    SlotMachineData,
    SlotSymbolProbabilities,
} from './slot-probability.interface';

/**
 * ハッピージャグラーの子役確率データ
 * 出典: なな徹
 * @see https://nana-press.com/kaiseki/machine/445/12200/
 */
export class HappyJuggler implements SlotMachineData {
    machineName: string;
    symbols: SlotSymbolProbabilities[];
    dataSource: string;

    constructor() {
        this.machineName = 'ハッピージャグラー';
        this.dataSource = 'なな徹 (https://nana-press.com/kaiseki/machine/445/12200/)';
        this.symbols = [
            {
                symbolName: 'ブドウ',
                probabilities: [
                    { setting: 1, probability: 1 / 6.07 },
                    { setting: 2, probability: 1 / 6.03 },
                    { setting: 3, probability: 1 / 6.00 },
                    { setting: 4, probability: 1 / 5.86 },
                    { setting: 5, probability: 1 / 5.84 },
                    { setting: 6, probability: 1 / 5.80 },
                ],
            },
            {
                symbolName: 'チェリー',
                probabilities: [
                    { setting: 1, probability: 1 / 62.57 },
                    { setting: 2, probability: 1 / 62.93 },
                    { setting: 3, probability: 1 / 63.77 },
                    { setting: 4, probability: 1 / 64.38 },
                    { setting: 5, probability: 1 / 65.52 },
                    { setting: 6, probability: 1 / 65.91 },
                ],
            },
            {
                symbolName: 'ピエロ',
                probabilities: [
                    { setting: 1, probability: 1 / 661.51 },
                    { setting: 2, probability: 1 / 664.59 },
                    { setting: 3, probability: 1 / 664.74 },
                    { setting: 4, probability: 1 / 660.79 },
                    { setting: 5, probability: 1 / 647.66 },
                    { setting: 6, probability: 1 / 660.79 },
                ],
            },
            {
                symbolName: 'ベル',
                probabilities: [
                    { setting: 1, probability: 1 / 677.81 },
                    { setting: 2, probability: 1 / 654.44 },
                    { setting: 3, probability: 1 / 645.57 },
                    { setting: 4, probability: 1 / 672.19 },
                    { setting: 5, probability: 1 / 642.39 },
                    { setting: 6, probability: 1 / 666.96 },
                ],
            },
            {
                symbolName: 'ビッグボーナス',
                probabilities: [
                    { setting: 1, probability: 1 / 273.1 },
                    { setting: 2, probability: 1 / 270.8 },
                    { setting: 3, probability: 1 / 263.2 },
                    { setting: 4, probability: 1 / 254.0 },
                    { setting: 5, probability: 1 / 239.2 },
                    { setting: 6, probability: 1 / 226.0 },
                ],
            },
            {
                symbolName: 'レギュラーボーナス',
                probabilities: [
                    { setting: 1, probability: 1 / 397.2 },
                    { setting: 2, probability: 1 / 362.1 },
                    { setting: 3, probability: 1 / 332.7 },
                    { setting: 4, probability: 1 / 300.6 },
                    { setting: 5, probability: 1 / 273.1 },
                    { setting: 6, probability: 1 / 256.0 },
                ],
            },
        ];
    }
} 