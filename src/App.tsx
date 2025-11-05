
import React, { useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  type Connection,
  type Edge,
  type Node,
} from "reactflow";
import "reactflow/dist/style.css";
import "./App.css";

const initialNodes: Node[] = [
  { id: "a", type: "input", data: { label: "Input A" }, position: { x: 50, y: 150 } },
  { id: "b", type: "input", data: { label: "Input B" }, position: { x: 50, y: 250 } },
  { id: "and1", type: "default", data: { label: "AND" }, position: { x: 250, y: 200 } },
  { id: "out", type: "output", data: { label: "Output" }, position: { x: 450, y: 200 } },
];

const initialEdges: Edge[] = [
  { id: "a-and1", source: "a", target: "and1" },
  { id: "b-and1", source: "b", target: "and1" },
  { id: "and1-out", source: "and1", target: "out" },
];

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onConnect = (connection: Connection) => setEdges((eds) => addEdge(connection, eds));

  return (
    <div className="app">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
} 
