import React from "react";
import "./ElementsSideBar.css";
import { DND_TYPE } from "../../core/constants";

export default function ElementsSideBar() {
  const onDragStart = (event: React.DragEvent, type: "input" | "default" | "output", label: string) => {
    event.dataTransfer.setData(DND_TYPE, type);
    event.dataTransfer.setData(`${DND_TYPE}:label`, label);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="sidebar">
      <h3>Nodes</h3>
      <div
        className="node-pill input"
        draggable
        onDragStart={(e) => onDragStart(e, "input", "Input")}
      >
        Input
      </div>
      <div
        className="node-pill default"
        draggable
        onDragStart={(e) => onDragStart(e, "default", "AND")}
      >
        AND
      </div>
      <div
        className="node-pill output"
        draggable
        onDragStart={(e) => onDragStart(e, "output", "Output")}
      >
        Output
      </div>
    </div>
  );
}
