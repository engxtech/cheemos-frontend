// ExampleNode.js
import { BaseNode } from "./baseNode";
import { Position } from "reactflow";
export const ExampleNode = ({ id, data }) => {
  const content = <span>This is an Example Node.</span>; // here you can add anything like box ,

  const handles = [
    { type: 'target', position: Position.Left },
    { type: 'source', position: Position.Right },
  ];

  return <BaseNode id={id} type="Example" data={data} handles={handles} content={content} />;
};
