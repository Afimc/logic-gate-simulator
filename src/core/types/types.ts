export type TBinary = 0 | 1;
export type TGateType = "AND" | "OR" | "NOT" | "XOR" | "NAND" | "NOR";
export type TGate = (a:TBinary, b?:TBinary) => TBinary;

export interface LogicGate {
  id: string;
  type: TGateType;
  inputs: string[];  // IDs of connected gates or input nodes
  output?: TBinary;
  x: number;
  y: number;
}