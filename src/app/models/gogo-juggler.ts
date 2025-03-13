import {
    SlotMachineData,
    SlotSymbolProbabilities,
} from './slot-probability.interface';

/**
 * ゴーゴージャグラーの子役確率データ
 * 出典: ぽこすろっとさん
 * @see https://www.nankaikoya.jp/gogojuggler3/
 */
export class GogoJuggler implements SlotMachineData {
    machineName: string;
    symbols: SlotSymbolProbabilities[];
    dataSource: string;

    constructor() {
        this.machineName = 'ゴーゴージャグラー';
        this.dataSource = 'ぽこすろっとさん (https://www.nankaikoya.jp/gogojuggler3/)';
        this.symbols = [
            {
                symbolName: 'ブドウ',
                probabilities: [
                    { setting: 1, probability: 1 / 6.23 },
                    { setting: 2, probability: 1 / 6.20 },
                    { setting: 3, probability: 1 / 6.14 },
                    { setting: 4, probability: 1 / 6.07 },
                    { setting: 5, probability: 1 / 6.00 },
                    { setting: 6, probability: 1 / 5.94 },
                ],
            },
            {
                symbolName: 'チェリー+BIG',
                probabilities: [
                    { setting: 1, probability: 1 / 1456 },
                    { setting: 2, probability: 1 / 1456 },
                    { setting: 3, probability: 1 / 1456 },
                    { setting: 4, probability: 1 / 1394 },
                    { setting: 5, probability: 1 / 1394 },
                    { setting: 6, probability: 1 / 1311 },
                ],
            },
            {
                symbolName: 'チェリー+REG',
                probabilities: [
                    { setting: 1, probability: 1 / 1425 },
                    { setting: 2, probability: 1 / 1311 },
                    { setting: 3, probability: 1 / 1170 },
                    { setting: 4, probability: 1 / 1111 },
                    { setting: 5, probability: 1 / 1024 },
                    { setting: 6, probability: 1 / 936 },
                ],
            },
            {
                symbolName: 'チェリー+ボーナス',
                probabilities: [
                    { setting: 1, probability: 1 / 720 },
                    { setting: 2, probability: 1 / 690 },
                    { setting: 3, probability: 1 / 649 },
                    { setting: 4, probability: 1 / 618 },
                    { setting: 5, probability: 1 / 590 },
                    { setting: 6, probability: 1 / 546 },
                ],
            },
            {
                symbolName: 'ビッグボーナス',
                probabilities: [
                    { setting: 1, probability: 1 / 259.0 },
                    { setting: 2, probability: 1 / 258.0 },
                    { setting: 3, probability: 1 / 257.0 },
                    { setting: 4, probability: 1 / 254.0 },
                    { setting: 5, probability: 1 / 247.3 },
                    { setting: 6, probability: 1 / 234.9 },
                ],
            },
            {
                symbolName: 'レギュラーボーナス',
                probabilities: [
                    { setting: 1, probability: 1 / 354.2 },
                    { setting: 2, probability: 1 / 332.7 },
                    { setting: 3, probability: 1 / 306.2 },
                    { setting: 4, probability: 1 / 268.6 },
                    { setting: 5, probability: 1 / 247.3 },
                    { setting: 6, probability: 1 / 234.9 },
                ],
            },
        ];
    }
} 