# ⚡ Logic Gate Simulator (Vite + TypeScript + React)

A visual **logic circuit simulator** built with **React**, **TypeScript**, and **Vite**.  
You can **drag and drop gates**, **connect them**, toggle **inputs (0 / 1)**, and **see outputs update in real-time** — just like a digital circuit sandbox.

---

## Logic Gates

Below are brief explanations and truth tables for each supported gate. Inputs are labeled `A` and `B` (except `NOT`, which only uses `A`). Labels match the app: AND, OR, NOT, XOR, NAND, NOR.

### AND (conjunction)
Outputs 1 only if both inputs are 1.

| A | B | AND |
|---|---|-----|
| 0 | 0 |  0  |
| 0 | 1 |  0  |
| 1 | 0 |  0  |
| 1 | 1 |  1  |

### OR (disjunction)
Outputs 1 if at least one input is 1.

| A | B | OR |
|---|---|----|
| 0 | 0 | 0  |
| 0 | 1 | 1  |
| 1 | 0 | 1  |
| 1 | 1 | 1  |

### XOR (exclusive OR)
Outputs 1 if exactly one input is 1.

| A | B | XOR |
|---|---|-----|
| 0 | 0 |  0  |
| 0 | 1 |  1  |
| 1 | 0 |  1  |
| 1 | 1 |  0  |

### NAND (NOT AND)
Outputs the inverse of AND.

| A | B | NAND |
|---|---|------|
| 0 | 0 |  1   |
| 0 | 1 |  1   |
| 1 | 0 |  1   |
| 1 | 1 |  0   |

### NOR (NOT OR)
Outputs the inverse of OR.

| A | B | NOR |
|---|---|-----|
| 0 | 0 |  1  |
| 0 | 1 |  0  |
| 1 | 0 |  0  |
| 1 | 1 |  0  |

### NOT (inverter)
Outputs the inverse of a single input `A`.

| A | NOT |
|---|-----|
| 0 |  1  |
| 1 |  0  |

## 🧩 Features

- 🧠 Logic gates: **AND**, **OR**, **NOT**, **XOR**, **NAND**, **NOR**
- 🎛️ Interactive **drag & drop** editor using [React Flow](https://reactflow.dev/)
- 🔗 Connect gates visually with live signal propagation
- ⚙️ Adjustable input probabilities for simulation mode
- 💡 Real-time output updates for all connected nodes
- 💾 Save / load your circuits (planned feature)

---

## 🚀 Tech Stack

| Category | Technology |
|-----------|-------------|
| Framework | [React](https://react.dev) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Bundler | [Vite](https://vitejs.dev/) |
| Graph Editor | [React Flow](https://reactflow.dev/) |
| State Management | React Hooks |
| Styling | CSS / Tailwind (optional) |

---
