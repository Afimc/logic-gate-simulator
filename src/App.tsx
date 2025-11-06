
import { ReactFlowProvider } from "reactflow";
import FlowCanvas from "./components/FlowCanvas/FlowCanvas";
import "./App.css";

export default function App() {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  );
}
