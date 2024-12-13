// LLMNode.js
import { BaseNode } from "./baseNode";
import { Position } from 'reactflow';

export const LLMNode = ({ id, data }) => {
  const content = <span>This is a LLM.</span>;

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-system`, style: { top: `${100 / 3}%` } },
    { type: 'target', position: Position.Left, id: `${id}-prompt`, style: { top: `${200 / 3}%` } },
    { type: 'source', position: Position.Right, id: `${id}-response` },
  ];

  return <BaseNode id={id} type="LLM" data={data} handles={handles} content={content} />;
};

