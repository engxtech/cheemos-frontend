import { SubmitButton } from "./submit";
import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { ReactFlowProvider } from 'reactflow';

export default function ReactFlow() {
  return (
    <div>
      <ReactFlowProvider>
        <div className="w-full border py-3">
          <PipelineToolbar />
          <PipelineUI />
          <SubmitButton />
        </div>
      </ReactFlowProvider>
    </div>
  );
}
