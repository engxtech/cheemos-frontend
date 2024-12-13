import { useState, useRef } from "react";
import { BaseNode } from "./baseNode";
import { Position } from "reactflow";
import { Select } from "antd";

const { Option } = Select;

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data?.inputType || "Text");
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setCurrName(e.target.value);
    if (inputRef.current) {
      inputRef.current.style.height = "auto"; 
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`; 
    }
  };

  const handleTypeChange = (value) => {
    setInputType(value);
  };

  const content = (
    <div className="p-2 space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Name:
        <textarea
          ref={inputRef}
          value={currName}
          onChange={handleInputChange}
          rows="1"
          className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Type:
        <Select
          value={inputType}
          onChange={handleTypeChange}
          className="w-full mt-1"
        >
          <Option value="File">File</Option>
          <Option value="Text">Text</Option>
        </Select>
      </label>
    </div>
  );

  const handles = [
    { type: "source", position: Position.Right, id: `${id}-value` },
  ];

  return (
    <BaseNode id={id} type="Input" data={data} handles={handles} content={content} />
  );
};
