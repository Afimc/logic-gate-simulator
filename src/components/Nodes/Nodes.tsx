import React from "react";
import { Handle, Position } from "reactflow";
import "./Nodes.css";
import InfoTable from "./InfoTable";

// Custom Input Node with toggle between 0 and 1
export const InputNode = ({ data }: any) => {
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
  const isNot = String(data?.label ?? '').toUpperCase() === 'NOT';
  const [showHelp, setShowHelp] = React.useState(false);
  const holdTimer = React.useRef<number | null>(null);

  const startHoverHold = () => {
    if (holdTimer.current) window.clearTimeout(holdTimer.current);
    holdTimer.current = window.setTimeout(() => setShowHelp(true), 1000);
  };

  const cancelHoverHold = () => {
    if (holdTimer.current) {
      window.clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
    setShowHelp(false);
  };

  const toggleHelp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (holdTimer.current) {
      window.clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
    // Remove focus to avoid persistent focus ring/border
    e.currentTarget.blur();
    setShowHelp((v) => !v);
  };

  React.useEffect(() => {
    return () => {
      if (holdTimer.current) {
        window.clearTimeout(holdTimer.current);
      }
    };
  }, []);

  return (
    <div className={`gate-node ${outputValue === 1 ? 'active' : 'inactive'}`}>
      {isNot ? (
        <Handle type="target" position={Position.Left} id="input-1" style={{ top: '50%' }} />
      ) : (
        <>
          <Handle type="target" position={Position.Left} id="input-1" style={{ top: '30%' }} />
          <Handle type="target" position={Position.Left} id="input-2" style={{ top: '70%' }} />
        </>
      )}
      <div className="gate-node-label">{data.label}</div>
      <div className="gate-node-output">{outputValue}</div>
      <button
        className="node-info-btn"
        aria-label="Gate info"
        onMouseEnter={(e) => {
          e.stopPropagation();
          startHoverHold();
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          cancelHoverHold();
        }}
        onClick={toggleHelp}
        onPointerDown={(e) => e.stopPropagation()}
      >
        i
      </button>
      <Handle type="source" position={Position.Right} id="output" />
      {showHelp && (
        <div
          className="node-tooltip"
          onMouseEnter={(e) => {
            e.stopPropagation();
            if (holdTimer.current) {
              window.clearTimeout(holdTimer.current);
              holdTimer.current = null;
            }
            setShowHelp(true);
          }}
          onMouseLeave={(e) => {
            e.stopPropagation();
            cancelHoverHold();
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <InfoTable label={data?.label} />
        </div>
      )}
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
