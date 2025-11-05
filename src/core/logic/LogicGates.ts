import {type TGate } from "../types/types";

export const andGate: TGate = (a, b) => (a && b ? 1 : 0);
export const orGate: TGate = (a, b) => (a || b ? 1 : 0);
export const notGate: TGate = (a) => (a ? 0 : 1);
export const xorGate: TGate = (a, b) => (a === b ? 0 : 1);
export const nandGate: TGate = (a, b) => notGate(andGate(a, b));
export const norGate: TGate = (a, b) => notGate(orGate(a, b));