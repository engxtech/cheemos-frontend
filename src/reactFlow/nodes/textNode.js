import { useState, useEffect } from "react";
import { BaseNode } from "./baseNode";
import { Input, Tooltip } from "antd";
import { Position } from "reactflow";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [handles, setHandles] = useState([
    { type: "source", position: Position.Right, id: `${id}-output` },
  ]);
  const [variableLabels, setVariableLabels] = useState([]);
  const [nodeHeight, setNodeHeight] = useState(50); 

  useEffect(() => {
    const textarea = document.getElementById(`${id}-textarea`);
    if (textarea) {
      setNodeHeight(textarea.scrollHeight + 20); 
    }
  }, [currText]);

  useEffect(() => {
   
    const variableMatches = [...currText.matchAll(/{{\s*(\w+)\s*}}/g)];

    const baseTop = 20; 
    const spacing = 30; 

    const newHandles = [
      { type: "source", position: Position.Right, id: `${id}-output` },
      ...variableMatches.map((match, index) => ({
        type: "target",
        position: Position.Left,
        id: `${id}-variable-${match[1]}`, 
        style: { top: `${baseTop + index * spacing}%` }, 
      })),
    ];
    setHandles(newHandles);
    const newVariableLabels = variableMatches.map((match) => match[1]);
    setVariableLabels(newVariableLabels);
  }, [currText, id]);

  const content = (
    <div className="p-4 bg-white">
      <label className="block text-sm text-gray-600">
        Text:
        <Input.TextArea
          id={`${id}-textarea`}
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          className="mt-1 w-full"
          autoSize 
          style={{ resize: "none" }} 
        />
      </label>
    </div>
  );

  return (
    <BaseNode
      id={id}
      type="Text"
      data={data}
      handles={handles}
      content={content}
      className="flex flex-col items-start justify-start p-4 bg-white border border-gray-300 rounded-lg shadow-md"
      style={{ minHeight: nodeHeight }} 
    >
      <div className="flex flex-col space-y-2">
        {variableLabels.map((variable, index) => (
          <Tooltip key={index} title={`Variable: ${variable}`} placement="left">
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 bg-blue-600 rounded-full"
                style={{ marginLeft: "-10px" }}
              ></div>
              <span className="text-sm text-gray-700">{variable}</span>
            </div>
          </Tooltip>
        ))}
      </div>
    </BaseNode>
  );
};

