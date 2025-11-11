export type GateInfoEntry = {
  desc: string;
  header: string[];
  rows: (string | number)[][];
};

export const gateInfo: Record<string, GateInfoEntry> = {
  AND: {
    desc: "Outputs 1 only if both inputs are 1.",
    header: ["A", "B", "AND"],
    rows: [
      [0, 0, 0],
      [0, 1, 0],
      [1, 0, 0],
      [1, 1, 1],
    ],
  },
  OR: {
    desc: "Outputs 1 if at least one input is 1.",
    header: ["A", "B", "OR"],
    rows: [
      [0, 0, 0],
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ],
  },
  XOR: {
    desc: "Outputs 1 if exactly one input is 1.",
    header: ["A", "B", "XOR"],
    rows: [
      [0, 0, 0],
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 0],
    ],
  },
  NAND: {
    desc: "Outputs the inverse of AND.",
    header: ["A", "B", "NAND"],
    rows: [
      [0, 0, 1],
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 0],
    ],
  },
  NOR: {
    desc: "Outputs the inverse of OR.",
    header: ["A", "B", "NOR"],
    rows: [
      [0, 0, 1],
      [0, 1, 0],
      [1, 0, 0],
      [1, 1, 0],
    ],
  },
  NOT: {
    desc: "Outputs the inverse of a single input A.",
    header: ["A", "NOT"],
    rows: [
      [0, 1],
      [1, 0],
    ],
  },
};

