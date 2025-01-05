import React from 'react';
import { Command } from 'lucide-react';
import { Input, Tool } from '../../store';
import { Agent } from '../../../../../../../redux/agents/store';

interface ToolSuggestionsProps {
  agent: Agent;
  onSelect: (tool: Tool) => void;
}

export function ToolSuggestions({ agent, onSelect }: ToolSuggestionsProps) {
  return (
    <div className="absolute left-0 right-0 mt-1 bg-gray-800 border border-gray-700 sm:max-w-[20vw] rounded-md shadow-lg max-h-60 overflow-auto z-50">
      {agent.toolsListCore?.map((tool) => (
        <button
          key={tool.id}
          onClick={() => {
            const key1: Tool = {
              name: tool.name ,
              toolType:tool.toolType, // Assign the key as key
              id: tool.id || "", // You can set this dynamically based on your needs
              description:tool.description, // You can set this dynamically based on your needs
            };
            onSelect(key1); // Passing the key1 object to the onSelect function
          }}
          className="w-full px-3 py-2 text-left hover:bg-gray-700 focus:outline-none flex items-center gap-2"
        >
          <Command className="w-4 h-4 text-gray-400" />
          <div>
            {/* <div className="text-sm font-medium text-gray-100">{tool.name}</div> */}
            <div className="text-xs text-gray-400">{tool.name}</div>
          </div>
        </button>
      ))}
    </div>
  );
}