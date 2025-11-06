import React from "react";
import { Handle, Position } from "reactflow";
import "./Nodes.css";

// Custom Input Node with toggle between 0 and 1
export const InputNode = ({ data, id }: any) => {
  const [value, setValue] = React.useState(data.value ?? 0);

  const toggleValue = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newValue = value === 0 ? 1 : 0;
    setValue(newValue);
    data.value = newValue;
    
    // Trigger re-render to propagate signal
    window.dispatchEvent(new CustomEvent('circuit-update'));
  };

  return (
    <div className={`input-node ${value === 1 ? 'active' : 'inactive'}`}>
      <div className="input-node-label">
        {data.label}
      </div>
      <button className="input-node-button" onClick={toggleValue}>
        {String(value)}
      </button>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

// Custom Default Node with 2 input handles on left and 1 output on right
export const DefaultNode = ({ data }: any) => {
  const outputValue = data.outputValue ?? 0;
  
  return (
    <div className={`gate-node ${outputValue === 1 ? 'active' : 'inactive'}`}>
      <Handle type="target" position={Position.Left} id="input-1" style={{ top: '30%' }} />
      <Handle type="target" position={Position.Left} id="input-2" style={{ top: '70%' }} />
      <div className="gate-node-label">{data.label}</div>
      <div className="gate-node-output">{outputValue}</div>
      <Handle type="source" position={Position.Right} id="output" />
    </div>
  );
};

// Custom Output Node with handle on the left
export const OutputNode = ({ data }: any) => {
  const inputValue = data.inputValue ?? 0;
  
  return (
    <div className={`output-node ${inputValue === 1 ? 'active' : 'inactive'}`}>
      <Handle type="target" position={Position.Left} />
      <div className="output-node-label">{data.label}</div>
      <div className="output-node-value">{inputValue}</div>
    </div>
  );
};
