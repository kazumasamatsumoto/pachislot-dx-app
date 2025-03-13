export interface SlotProbability {
  setting: number;
  probability: number;
}

export interface SlotSymbolProbabilities {
  symbolName: string;
  probabilities: SlotProbability[];
}

export interface SlotMachineData {
  machineName: string;
  symbols: SlotSymbolProbabilities[];
  dataSource?: string;
}
