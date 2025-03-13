import {
    SlotMachineData,
    SlotSymbolProbabilities,
} from './slot-probability.interface';

/**
 * ファンキージャグラーの子役確率データ
 * 出典: すろぱちくえすと
 * @see https://www.slopachi-quest.com/article/fanky-jagra-2-settei/
 */
export class FunkyJuggler implements SlotMachineData {
    machineName: string;
    symbols: SlotSymbolProbabilities[];
    dataSource: string;

    constructor() {
        this.machineName = 'ファンキージャグラー';
        this.dataSource = 'すろぱちくえすと (https://www.slopachi-quest.com/article/fanky-jagra-2-settei/)';
        this.symbols = [
            {
                symbolName: 'リプレイ',
                probabilities: [
                    { setting: 1, probability: 1 / 7.31 },
                    { setting: 2, probability: 1 / 7.32 },
                    { setting: 3, probability: 1 / 7.31 },
                    { setting: 4, probability: 1 / 7.30 },
                    { setting: 5, probability: 1 / 7.28 },
                    { setting: 6, probability: 1 / 7.29 },
                ],
            },
            {
                symbolName: 'ブドウ',
                probabilities: [
                    { setting: 1, probability: 1 / 5.93 },
                    { setting: 2, probability: 1 / 5.90 },
                    { setting: 3, probability: 1 / 5.83 },
                    { setting: 4, probability: 1 / 5.81 },
                    { setting: 5, probability: 1 / 5.75 },
                    { setting: 6, probability: 1 / 5.72 },
                ],
            },
            {
                symbolName: '共通チェリー(ボーナス非当選)',
                probabilities: [
                    { setting: 1, probability: 1 / 35.53 },
                    { setting: 2, probability: 1 / 35.53 },
                    { setting: 3, probability: 1 / 35.60 },
                    { setting: 4, probability: 1 / 35.58 },
                    { setting: 5, probability: 1 / 35.62 },
                    { setting: 6, probability: 1 / 35.51 },
                ],
            },
            {
                symbolName: '共通チェリー(ボーナス同時成立)',
                probabilities: [
                    { setting: 1, probability: 1 / 716.14 },
                    { setting: 2, probability: 1 / 694.44 },
                    { setting: 3, probability: 1 / 664.65 },
                    { setting: 4, probability: 1 / 633.63 },
                    { setting: 5, probability: 1 / 598.80 },
                    { setting: 6, probability: 1 / 551.59 },
                ],
            },
            {
                symbolName: '単独チェリー(1番チェリー)',
                probabilities: [
                    { setting: 1, probability: 1 / 7067.48 },
                    { setting: 2, probability: 1 / 5613.20 },
                    { setting: 3, probability: 1 / 5576.48 },
                    { setting: 4, probability: 1 / 5085.38 },
                    { setting: 5, probability: 1 / 4861.27 },
                    { setting: 6, probability: 1 / 4373.29 },
                ],
            },
            {
                symbolName: '単独チェリー(13番チェリー)',
                probabilities: [
                    { setting: 1, probability: 1 / 6279.50 },
                    { setting: 2, probability: 1 / 6256.17 },
                    { setting: 3, probability: 1 / 5405.32 },
                    { setting: 4, probability: 1 / 5206.69 },
                    { setting: 5, probability: 1 / 4710.14 },
                    { setting: 6, probability: 1 / 4128.12 },
                ],
            },
            {
                symbolName: 'ピエロ',
                probabilities: [
                    { setting: 1, probability: 1 / 1070.37 },
                    { setting: 2, probability: 1 / 1052.95 },
                    { setting: 3, probability: 1 / 1071.73 },
                    { setting: 4, probability: 1 / 1084.81 },
                    { setting: 5, probability: 1 / 1084.79 },
                    { setting: 6, probability: 1 / 1096.84 },
                ],
            },
            {
                symbolName: 'ベル',
                probabilities: [
                    { setting: 1, probability: 1 / 1082.03 },
                    { setting: 2, probability: 1 / 1091.89 },
                    { setting: 3, probability: 1 / 1090.13 },
                    { setting: 4, probability: 1 / 1084.17 },
                    { setting: 5, probability: 1 / 1099.00 },
                    { setting: 6, probability: 1 / 1084.19 },
                ],
            },
            {
                symbolName: '単独チェリー+1枚役(1番チェリー)',
                probabilities: [
                    { setting: 1, probability: 1 / 10406.02 },
                    { setting: 2, probability: 1 / 12030.04 },
                    { setting: 3, probability: 1 / 10128.70 },
                    { setting: 4, probability: 1 / 10699.23 },
                    { setting: 5, probability: 1 / 11555.82 },
                    { setting: 6, probability: 1 / 10920.08 },
                ],
            },
            {
                symbolName: '単独チェリー+1枚役(13番チェリー)',
                probabilities: [
                    { setting: 1, probability: 1 / 10992.28 },
                    { setting: 2, probability: 1 / 11191.88 },
                    { setting: 3, probability: 1 / 10379.03 },
                    { setting: 4, probability: 1 / 11068.17 },
                    { setting: 5, probability: 1 / 11176.94 },
                    { setting: 6, probability: 1 / 10438.93 },
                ],
            },
            {
                symbolName: '中段チェリー+1枚役',
                probabilities: [
                    { setting: 1, probability: 1 / 15050.03 },
                    { setting: 2, probability: 1 / 17561.54 },
                    { setting: 3, probability: 1 / 17610.87 },
                    { setting: 4, probability: 1 / 14435.48 },
                    { setting: 5, probability: 1 / 11154.08 },
                    { setting: 6, probability: 1 / 11471.83 },
                ],
            },
            {
                symbolName: '単独1枚役',
                probabilities: [
                    { setting: 1, probability: 1 / 33311.96 },
                    { setting: 2, probability: 1 / 30174.80 },
                    { setting: 3, probability: 1 / 28583.09 },
                    { setting: 4, probability: 1 / 34103.81 },
                    { setting: 5, probability: 1 / 35417.83 },
                    { setting: 6, probability: 1 / 29296.35 },
                ],
            },
            {
                symbolName: '単独BIG',
                probabilities: [
                    { setting: 1, probability: 1 / 404.26 },
                    { setting: 2, probability: 1 / 401.89 },
                    { setting: 3, probability: 1 / 394.12 },
                    { setting: 4, probability: 1 / 381.07 },
                    { setting: 5, probability: 1 / 377.49 },
                    { setting: 6, probability: 1 / 336.12 },
                ],
            },
            {
                symbolName: '単独REG',
                probabilities: [
                    { setting: 1, probability: 1 / 636.14 },
                    { setting: 2, probability: 1 / 571.90 },
                    { setting: 3, probability: 1 / 510.60 },
                    { setting: 4, probability: 1 / 449.18 },
                    { setting: 5, probability: 1 / 408.26 },
                    { setting: 6, probability: 1 / 360.15 },
                ],
            },
            {
                symbolName: '共通チェリー+BIG',
                probabilities: [
                    { setting: 1, probability: 1 / 1422.33 },
                    { setting: 2, probability: 1 / 1389.02 },
                    { setting: 3, probability: 1 / 1321.88 },
                    { setting: 4, probability: 1 / 1352.32 },
                    { setting: 5, probability: 1 / 1289.44 },
                    { setting: 6, probability: 1 / 1197.87 },
                ],
            },
            {
                symbolName: '共通チェリー+REG',
                probabilities: [
                    { setting: 1, probability: 1 / 1423.07 },
                    { setting: 2, probability: 1 / 1369.52 },
                    { setting: 3, probability: 1 / 1317.10 },
                    { setting: 4, probability: 1 / 1174.73 },
                    { setting: 5, probability: 1 / 1100.78 },
                    { setting: 6, probability: 1 / 1005.00 },
                ],
            },
            {
                symbolName: '単独チェリー1+BIG(1番チェリー)',
                probabilities: [
                    { setting: 1, probability: 1 / 7067.48 },
                    { setting: 2, probability: 1 / 5613.20 },
                    { setting: 3, probability: 1 / 5576.48 },
                    { setting: 4, probability: 1 / 5085.38 },
                    { setting: 5, probability: 1 / 4861.27 },
                    { setting: 6, probability: 1 / 4373.29 },
                ],
            },
            {
                symbolName: '単独チェリー2+BIG(13番チェリー)',
                probabilities: [
                    { setting: 1, probability: 1 / 6279.50 },
                    { setting: 2, probability: 1 / 6256.17 },
                    { setting: 3, probability: 1 / 5405.32 },
                    { setting: 4, probability: 1 / 5206.69 },
                    { setting: 5, probability: 1 / 4710.14 },
                    { setting: 6, probability: 1 / 4128.12 },
                ],
            },
            {
                symbolName: '単独チェリー1+1枚役+BIG(1番チェリー)',
                probabilities: [
                    { setting: 1, probability: 1 / 10406.02 },
                    { setting: 2, probability: 1 / 12030.04 },
                    { setting: 3, probability: 1 / 10128.70 },
                    { setting: 4, probability: 1 / 10699.23 },
                    { setting: 5, probability: 1 / 11555.82 },
                    { setting: 6, probability: 1 / 10920.08 },
                ],
            },
            {
                symbolName: '単独チェリー1+1枚役+BIG(13番チェリー)',
                probabilities: [
                    { setting: 1, probability: 1 / 10992.28 },
                    { setting: 2, probability: 1 / 11191.88 },
                    { setting: 3, probability: 1 / 10379.03 },
                    { setting: 4, probability: 1 / 11068.17 },
                    { setting: 5, probability: 1 / 11176.94 },
                    { setting: 6, probability: 1 / 10438.93 },
                ],
            },
            {
                symbolName: '中段チェリー+1枚役+BIG',
                probabilities: [
                    { setting: 1, probability: 1 / 15050.03 },
                    { setting: 2, probability: 1 / 17561.54 },
                    { setting: 3, probability: 1 / 17610.87 },
                    { setting: 4, probability: 1 / 14435.48 },
                    { setting: 5, probability: 1 / 11154.08 },
                    { setting: 6, probability: 1 / 11471.83 },
                ],
            },
            {
                symbolName: 'チェリー同時成立(表内合成)',
                probabilities: [
                    { setting: 1, probability: 1 / 510.19 },
                    { setting: 2, probability: 1 / 495.66 },
                    { setting: 3, probability: 1 / 469.06 },
                    { setting: 4, probability: 1 / 447.92 },
                    { setting: 5, probability: 1 / 422.36 },
                    { setting: 6, probability: 1 / 388.31 },
                ],
            },
        ];
    }
} 