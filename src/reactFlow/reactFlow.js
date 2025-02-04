import { SubmitButton } from "./submit";
import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { ReactFlowProvider } from 'reactflow';

export default function ReactFlow() {
  return (
    <div>
      <ReactFlowProvider>
        <div className="w-full h-[97vh] sm:border border-gray-500 py-3">
          <PipelineToolbar />
          <PipelineUI />
          <SubmitButton />
        </div>
      </ReactFlowProvider>
    </div>
  );
}
