import React from "react";
import "./ElementsSideBar.css";
import { DND_TYPE } from "../../core/constants";
import { gateInfo } from "../../core/logic/GateInfo";

export default function ElementsSideBar() {
  const [helpFor, setHelpFor] = React.useState<string | null>(null);
  const timerRef = React.useRef<number | null>(null);

  const scheduleHelp = (label: string) => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setHelpFor(label), 1500);
  };

  const cancelHelp = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setHelpFor(null);
  };

  const onDragStart = (event: React.DragEvent, type: "input" | "default" | "output", label: string) => {
    event.dataTransfer.setData(DND_TYPE, type);
    event.dataTransfer.setData(`${DND_TYPE}:label`, label);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="sidebar">
      <h3>Logic Gates </h3>
      <div
        className="node-pill input"
        draggable
        onMouseEnter={() => scheduleHelp("INPUT")}
        onMouseLeave={cancelHelp}
        onDragStart={(e) => onDragStart(e, "input", "Input")}
      >
        Input
        {helpFor === "INPUT" && (
          <div className="sidebar-tooltip">
            <div className="sidebar-tooltip-title">Input</div>
            <div className="sidebar-tooltip-desc">Toggle between 0 and 1 to drive connected gates.</div>
          </div>
        )}
      </div>
      <div
        className="node-pill default"
        draggable
        onMouseEnter={() => scheduleHelp("AND")}
        onMouseLeave={cancelHelp}
        onDragStart={(e) => onDragStart(e, "default", "AND")}
      >
        AND
        {helpFor === "AND" && (
          <div className="sidebar-tooltip">
            <div className="sidebar-tooltip-title">AND</div>
            <div className="sidebar-tooltip-desc">{gateInfo.AND.desc}</div>
            <table className="sidebar-tooltip-table">
              <thead>
                <tr>
                  {gateInfo.AND.header.map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {gateInfo.AND.rows.map((r, i) => (
                  <tr key={i}>{r.map((c, j) => (<td key={j}>{String(c)}</td>))}</tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div
        className="node-pill default"
        draggable
        onMouseEnter={() => scheduleHelp("OR")}
        onMouseLeave={cancelHelp}
        onDragStart={(e) => onDragStart(e, "default", "OR")}
      >
        OR
        {helpFor === "OR" && (
          <div className="sidebar-tooltip">
            <div className="sidebar-tooltip-title">OR</div>
            <div className="sidebar-tooltip-desc">{gateInfo.OR.desc}</div>
            <table className="sidebar-tooltip-table">
              <thead>
                <tr>
                  {gateInfo.OR.header.map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {gateInfo.OR.rows.map((r, i) => (
                  <tr key={i}>{r.map((c, j) => (<td key={j}>{String(c)}</td>))}</tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div
        className="node-pill default"
        draggable
        onMouseEnter={() => scheduleHelp("XOR")}
        onMouseLeave={cancelHelp}
        onDragStart={(e) => onDragStart(e, "default", "XOR")}
      >
        XOR
        {helpFor === "XOR" && (
          <div className="sidebar-tooltip">
            <div className="sidebar-tooltip-title">XOR</div>
            <div className="sidebar-tooltip-desc">{gateInfo.XOR.desc}</div>
            <table className="sidebar-tooltip-table">
              <thead>
                <tr>
                  {gateInfo.XOR.header.map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {gateInfo.XOR.rows.map((r, i) => (
                  <tr key={i}>{r.map((c, j) => (<td key={j}>{String(c)}</td>))}</tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div
        className="node-pill default"
        draggable
        onMouseEnter={() => scheduleHelp("NAND")}
        onMouseLeave={cancelHelp}
        onDragStart={(e) => onDragStart(e, "default", "NAND")}
      >
        NAND
        {helpFor === "NAND" && (
          <div className="sidebar-tooltip">
            <div className="sidebar-tooltip-title">NAND</div>
            <div className="sidebar-tooltip-desc">{gateInfo.NAND.desc}</div>
            <table className="sidebar-tooltip-table">
              <thead>
                <tr>
                  {gateInfo.NAND.header.map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {gateInfo.NAND.rows.map((r, i) => (
                  <tr key={i}>{r.map((c, j) => (<td key={j}>{String(c)}</td>))}</tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div
        className="node-pill default"
        draggable
        onMouseEnter={() => scheduleHelp("NOR")}
        onMouseLeave={cancelHelp}
        onDragStart={(e) => onDragStart(e, "default", "NOR")}
      >
        NOR
        {helpFor === "NOR" && (
          <div className="sidebar-tooltip">
            <div className="sidebar-tooltip-title">NOR</div>
            <div className="sidebar-tooltip-desc">{gateInfo.NOR.desc}</div>
            <table className="sidebar-tooltip-table">
              <thead>
                <tr>
                  {gateInfo.NOR.header.map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {gateInfo.NOR.rows.map((r, i) => (
                  <tr key={i}>{r.map((c, j) => (<td key={j}>{String(c)}</td>))}</tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div
        className="node-pill default"
        draggable
        onMouseEnter={() => scheduleHelp("NOT")}
        onMouseLeave={cancelHelp}
        onDragStart={(e) => onDragStart(e, "default", "NOT")}
      >
        NOT
        {helpFor === "NOT" && (
          <div className="sidebar-tooltip">
            <div className="sidebar-tooltip-title">NOT</div>
            <div className="sidebar-tooltip-desc">{gateInfo.NOT.desc}</div>
            <table className="sidebar-tooltip-table">
              <thead>
                <tr>
                  {gateInfo.NOT.header.map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {gateInfo.NOT.rows.map((r, i) => (
                  <tr key={i}>{r.map((c, j) => (<td key={j}>{String(c)}</td>))}</tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div
        className="node-pill output"
        draggable
        onMouseEnter={() => scheduleHelp("OUTPUT")}
        onMouseLeave={cancelHelp}
        onDragStart={(e) => onDragStart(e, "output", "Output")}
      >
        Output
        {helpFor === "OUTPUT" && (
          <div className="sidebar-tooltip">
            <div className="sidebar-tooltip-title">Output</div>
            <div className="sidebar-tooltip-desc">Displays the signal it receives (0 or 1).</div>
          </div>
        )}
      </div>
    </div>
  );
}
