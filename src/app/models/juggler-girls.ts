import {
    SlotMachineData,
    SlotSymbolProbabilities,
} from './slot-probability.interface';

/**
 * ジャグラーガールズの子役確率データ
 * 出典: すろぱちくえすとさん
 * @see https://www.slopachi-quest.com/article/juggler-girls/
 */
export class JugglerGirls implements SlotMachineData {
    machineName: string;
    symbols: SlotSymbolProbabilities[];
    dataSource: string;

    constructor() {
        this.machineName = 'ジャグラーガールズ';
        this.dataSource = 'すろぱちくえすとさん (https://www.slopachi-quest.com/article/juggler-girls/)';
        this.symbols = [
            {
                symbolName: 'ブドウ',
                probabilities: [
                    { setting: 1, probability: 1 / 6.33 },
                    { setting: 2, probability: 1 / 6.33 },
                    { setting: 3, probability: 1 / 6.33 },
                    { setting: 4, probability: 1 / 6.33 },
                    { setting: 5, probability: 1 / 6.21 },
                    { setting: 6, probability: 1 / 6.15 },
                ],
            },
            {
                symbolName: 'チェリー',
                probabilities: [
                    { setting: 1, probability: 1 / 33.56 },
                    { setting: 2, probability: 1 / 33.47 },
                    { setting: 3, probability: 1 / 33.32 },
                    { setting: 4, probability: 1 / 33.15 },
                    { setting: 5, probability: 1 / 33.10 },
                    { setting: 6, probability: 1 / 32.97 },
                ],
            },
            {
                symbolName: 'ピエロ',
                probabilities: [
                    { setting: 1, probability: 1 / 1092.27 },
                    { setting: 2, probability: 1 / 1092.27 },
                    { setting: 3, probability: 1 / 1092.27 },
                    { setting: 4, probability: 1 / 1092.27 },
                    { setting: 5, probability: 1 / 1092.27 },
                    { setting: 6, probability: 1 / 1092.27 },
                ],
            },
            {
                symbolName: 'ベル',
                probabilities: [
                    { setting: 1, probability: 1 / 1092.27 },
                    { setting: 2, probability: 1 / 1092.27 },
                    { setting: 3, probability: 1 / 1092.27 },
                    { setting: 4, probability: 1 / 1092.27 },
                    { setting: 5, probability: 1 / 1092.27 },
                    { setting: 6, probability: 1 / 1092.27 },
                ],
            },
            {
                symbolName: '単独BIG',
                probabilities: [
                    { setting: 1, probability: 1 / 409.60 },
                    { setting: 2, probability: 1 / 399.61 },
                    { setting: 3, probability: 1 / 390.10 },
                    { setting: 4, probability: 1 / 372.36 },
                    { setting: 5, probability: 1 / 360.09 },
                    { setting: 6, probability: 1 / 334.37 },
                ],
            },
            {
                symbolName: '単独REG',
                probabilities: [
                    { setting: 1, probability: 1 / 546.13 },
                    { setting: 2, probability: 1 / 504.12 },
                    { setting: 3, probability: 1 / 464.79 },
                    { setting: 4, probability: 1 / 422.81 },
                    { setting: 5, probability: 1 / 407.06 },
                    { setting: 6, probability: 1 / 385.51 },
                ],
            },
            {
                symbolName: 'チェリー+BIG',
                probabilities: [
                    { setting: 1, probability: 1 / 1963.76 },
                    { setting: 2, probability: 1 / 1963.76 },
                    { setting: 3, probability: 1 / 1910.22 },
                    { setting: 4, probability: 1 / 1910.22 },
                    { setting: 5, probability: 1 / 1910.22 },
                    { setting: 6, probability: 1 / 862.32 },
                ],
            },
            {
                symbolName: 'チェリー+REG',
                probabilities: [
                    { setting: 1, probability: 1 / 1456.36 },
                    { setting: 2, probability: 1 / 1310.72 },
                    { setting: 3, probability: 1 / 1191.56 },
                    { setting: 4, probability: 1 / 1008.25 },
                    { setting: 5, probability: 1 / 963.76 },
                    { setting: 6, probability: 1 / 910.22 },
                ],
            },
            {
                symbolName: 'ビッグボーナス',
                probabilities: [
                    { setting: 1, probability: 1 / 287.44 },
                    { setting: 2, probability: 1 / 282.48 },
                    { setting: 3, probability: 1 / 273.07 },
                    { setting: 4, probability: 1 / 264.26 },
                    { setting: 5, probability: 1 / 258.02 },
                    { setting: 6, probability: 1 / 240.94 },
                ],
            },
            {
                symbolName: 'レギュラーボーナス',
                probabilities: [
                    { setting: 1, probability: 1 / 397.19 },
                    { setting: 2, probability: 1 / 364.09 },
                    { setting: 3, probability: 1 / 334.37 },
                    { setting: 4, probability: 1 / 297.89 },
                    { setting: 5, probability: 1 / 286.18 },
                    { setting: 6, probability: 1 / 270.81 },
                ],
            },
        ];
    }
} 