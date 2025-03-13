import {
    SlotMachineData,
    SlotSymbolProbabilities,
} from './slot-probability.interface';

/**
 * ミスタージャグラーの子役確率データ
 * 出典: ジャグいろはさん
 * @see https://jug123.com/mrspec/
 */
export class MisterJuggler implements SlotMachineData {
    machineName: string;
    symbols: SlotSymbolProbabilities[];
    dataSource: string;

    constructor() {
        this.machineName = 'ミスタージャグラー';
        this.dataSource = 'ジャグいろはさん (https://jug123.com/mrspec/)';
        this.symbols = [
            {
                symbolName: 'ブドウ',
                probabilities: [
                    { setting: 1, probability: 1 / 6.29 },
                    { setting: 2, probability: 1 / 6.22 },
                    { setting: 3, probability: 1 / 6.15 },
                    { setting: 4, probability: 1 / 6.09 },
                    { setting: 5, probability: 1 / 6.02 },
                    { setting: 6, probability: 1 / 5.96 },
                ],
            },
            {
                symbolName: 'チェリー',
                probabilities: [
                    { setting: 1, probability: 1 / 37.24 },
                    { setting: 2, probability: 1 / 37.24 },
                    { setting: 3, probability: 1 / 37.24 },
                    { setting: 4, probability: 1 / 37.24 },
                    { setting: 5, probability: 1 / 37.24 },
                    { setting: 6, probability: 1 / 37.24 },
                ],
            },
            {
                symbolName: 'ビッグボーナス',
                probabilities: [
                    { setting: 1, probability: 1 / 268.6 },
                    { setting: 2, probability: 1 / 267.5 },
                    { setting: 3, probability: 1 / 260.1 },
                    { setting: 4, probability: 1 / 249.2 },
                    { setting: 5, probability: 1 / 240.9 },
                    { setting: 6, probability: 1 / 237.4 },
                ],
            },
            {
                symbolName: 'レギュラーボーナス',
                probabilities: [
                    { setting: 1, probability: 1 / 374.5 },
                    { setting: 2, probability: 1 / 354.2 },
                    { setting: 3, probability: 1 / 331.0 },
                    { setting: 4, probability: 1 / 291.3 },
                    { setting: 5, probability: 1 / 257.0 },
                    { setting: 6, probability: 1 / 237.4 },
                ],
            },
        ];
    }
} 