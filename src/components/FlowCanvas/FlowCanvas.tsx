import React, { useCallback, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  type Connection,
  type Edge,
  type Node,
  useReactFlow,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import "./FlowCanvas.css";
import ElementsSideBar from "../elementsSideBar/ElementsSideBar";
import { InputNode, DefaultNode, OutputNode } from "../Nodes/Nodes";
import { DND_TYPE } from "../../core/constants";
import { andGate, orGate, notGate, xorGate, nandGate, norGate } from "../../core/logic/LogicGates";

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

// Define nodeTypes outside component to prevent re-creation
const nodeTypes = {
  input: InputNode,
  default: DefaultNode,
  output: OutputNode,
};

export default function FlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();
  
  // Use refs to avoid dependency issues
  const nodesRef = React.useRef(nodes);
  const edgesRef = React.useRef(edges);
  
  React.useEffect(() => {
    nodesRef.current = nodes;
    edgesRef.current = edges;
  }, [nodes, edges]);

  // Evaluate logic gates and propagate signals
  const evaluateCircuit = useCallback(() => {
    const currentEdges = edgesRef.current;
    let updatedNodes: Node[] = [];
    
    // Run evaluation multiple times to handle cascading gates
    const maxIterations = 10; // Enough for most circuits
    
    setNodes((nds) => {
      updatedNodes = [...nds];
      
      // Iterate multiple times to propagate through all gate levels
      for (let iteration = 0; iteration < maxIterations; iteration++) {
        let hasChanges = false;
        
        updatedNodes = updatedNodes.map((node) => {
          if (node.type === 'default') {
            const incomingEdges = currentEdges.filter((edge) => edge.target === node.id);
            
            const input1Edge = incomingEdges.find((e) => e.targetHandle === 'input-1');
            const input2Edge = incomingEdges.find((e) => e.targetHandle === 'input-2');
            
            const input1Node = input1Edge ? updatedNodes.find((n) => n.id === input1Edge.source) : null;
            const input2Node = input2Edge ? updatedNodes.find((n) => n.id === input2Edge.source) : null;
            
            const input1 = input1Node?.data?.value ?? input1Node?.data?.outputValue ?? 0;
            const input2 = input2Node?.data?.value ?? input2Node?.data?.outputValue ?? 0;
            
            let outputValue = 0;
            const gateType = node.data.label.toUpperCase();
            
            switch (gateType) {
              case 'AND':
                outputValue = andGate(input1, input2);
                break;
              case 'OR':
                outputValue = orGate(input1, input2);
                break;
              case 'NOT':
                outputValue = notGate(input1);
                break;
              case 'XOR':
                outputValue = xorGate(input1, input2);
                break;
              case 'NAND':
                outputValue = nandGate(input1, input2);
                break;
              case 'NOR':
                outputValue = norGate(input1, input2);
                break;
            }
            
            // Check if value changed
            if (node.data.outputValue !== outputValue) {
              hasChanges = true;
            }
            
            return {
              ...node,
              data: {
                ...node.data,
                outputValue,
              },
            };
          } else if (node.type === 'output') {
            const incomingEdge = currentEdges.find((edge) => edge.target === node.id);
            const sourceNode = incomingEdge ? updatedNodes.find((n) => n.id === incomingEdge.source) : null;
            
            const inputValue = sourceNode?.data?.value ?? sourceNode?.data?.outputValue ?? 0;
            
            // Check if value changed
            if (node.data.inputValue !== inputValue) {
              hasChanges = true;
            }
            
            return {
              ...node,
              data: {
                ...node.data,
                inputValue,
              },
            };
          }
          
          return node;
        });
        
        // If nothing changed, we can stop early
        if (!hasChanges) {
          break;
        }
      }
      
      return updatedNodes;
    });

    // Update edge colors
    setTimeout(() => {
      setEdges((eds) =>
        eds.map((edge) => {
          const sourceNode = updatedNodes.find((n) => n.id === edge.source);
          const signalValue = sourceNode?.data?.value ?? sourceNode?.data?.outputValue ?? 0;
          
          return {
            ...edge,
            animated: signalValue === 1,
            style: {
              stroke: signalValue === 1 ? '#4ade80' : '#f87171',
              strokeWidth: 3,
            },
          };
        })
      );
    }, 0);
  }, [setNodes, setEdges]);

  // Listen for circuit updates
  useEffect(() => {
    const handleUpdate = () => {
      evaluateCircuit();
    };
    
    window.addEventListener('circuit-update', handleUpdate);
    return () => window.removeEventListener('circuit-update', handleUpdate);
  }, [evaluateCircuit]);

  // Evaluate on edges change
  useEffect(() => {
    if (edges.length > 0) {
      evaluateCircuit();
    }
  }, [edges.length, evaluateCircuit]);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  const onEdgeClick = useCallback(
    (_: React.MouseEvent, edge: Edge) => {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    },
    [setEdges]
  );

  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.preventDefault();
      setNodes((nds) => nds.filter((n) => n.id !== node.id));
      setEdges((eds) => eds.filter((e) => e.source !== node.id && e.target !== node.id));
    },
    [setNodes, setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();

    const type = event.dataTransfer.getData(DND_TYPE);
    const label = event.dataTransfer.getData(`${DND_TYPE}:label`) || type;

    if (!type) return;

    const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
    const id = `${type}-${Date.now()}`;

    setNodes((nds) => [
      ...nds,
      {
        id,
        type,
        data: { 
          label,
          value: type === "input" ? 0 : undefined // Initialize input nodes with value 0
        },
        position,
      },
    ]);
  }, [screenToFlowPosition, setNodes]);

  return (
    <div className="app">
      <ElementsSideBar />
      <div className="canvas" onDrop={onDrop} onDragOver={onDragOver}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeClick={onEdgeClick}
          onNodeContextMenu={onNodeContextMenu}
          nodeTypes={nodeTypes}
          deleteKeyCode="Delete"
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
}




  // const { screenToFlowPosition, fitView } = useReactFlow();

  // const handleFitView = useCallback(() => {
  //   fitView({ padding: 0.2, duration: 400 });
  // }, [fitView]);