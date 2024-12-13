import { BaseNode } from "./baseNode";
import { Position } from "reactflow";
import { Select, Checkbox, Tooltip } from "antd";

const { Option } = Select;

export const PipelineExampleNode = ({ id, data }) => {
  const content = (
    <div className="p-3 text-sm text-gray-700 font-sans">
      <div className="flex items-center justify-between">
        <span className="font-bold text-base">Pipeline</span>
        <button
          className="text-gray-500 hover:text-gray-700 text-lg"
          aria-label="Close"
        >
          &times;
        </button>
      </div>

      <div className="mt-3">
        <label
          htmlFor={`pipeline-select-${id}`}
          className="block text-gray-600 mb-1"
        >
          Pipeline
        </label>
        <Select
          id={`pipeline-select-${id}`}
          placeholder="Select a pipeline"
          className="w-full"
          bordered={true}
        >
          <Option value="pipeline1">Pipeline 1</Option>
          <Option value="pipeline2">Pipeline 2</Option>
        </Select>
      </div>

      <div className="mt-3">
        <Checkbox>Batch Mode</Checkbox>
      </div>

      <div className="mt-3 text-xs text-gray-500">
        <Tooltip title="Ensure your pipeline is deployed to see the expected inputs and outputs.">
          Not seeing the inputs and outputs you expect? (Did you deploy your pipeline?)
        </Tooltip>
      </div>
    </div>
  );

  const handles = [
    { type: 'target', position: Position.Left },
    { type: 'source', position: Position.Right },
  ];

  return <BaseNode id={id} type="Pipeline" data={data} handles={handles} content={content} />;
};
