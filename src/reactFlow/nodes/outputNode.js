// OutputNode.js
import { useState } from 'react';
import { BaseNode } from './baseNode';
import { Input, Select } from 'antd';
import { Position } from 'reactflow';
export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const content = (
    <div className="p-4 bg-white  rounded-sm shadow-sm">
      <label className="block text-sm text-gray-600 mb-2">
        Field Name:
        <Input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          className="mt-1"
        />
      </label>
      <label className="block text-sm text-gray-600 mb-2">
        Type:
        <select
          value={outputType}
          onChange={(value) => setOutputType(value)}
          className="mt-1 w-full border p-2 rounded-lg"
        >
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </label>
    </div>
  );

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-value` },
  ];

  return (
    <BaseNode
      id={id}
      type="Output"
      data={data}
      handles={handles}
      content={content}
      className="flex items-center justify-between p-4 bg-white border border-gray-300 rounded-lg shadow-md"
    >
      <div className="text-blue-600 text-sm">Output</div>
    </BaseNode>
  );
};
