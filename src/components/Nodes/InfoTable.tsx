import React from "react";
import { gateInfo } from "../../core/logic/GateInfo";

interface InfoTableProps {
  label: string | undefined;
}

export default function InfoTable({ label }: InfoTableProps) {
  const key = String(label ?? '').toUpperCase();
  const info = gateInfo[key as keyof typeof gateInfo];
  if (!info) return null;

  return (
    <>
      <div className="node-tooltip-title">{key}</div>
      <div className="node-tooltip-desc">{info.desc}</div>
      <table className="node-tooltip-table">
        <thead>
          <tr>
            {info.header.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {info.rows.map((r, idx) => (
            <tr key={idx}>
              {r.map((c, i) => (
                <td key={i}>{String(c)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

