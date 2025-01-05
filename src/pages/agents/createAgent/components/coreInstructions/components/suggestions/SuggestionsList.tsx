import React from "react";
import { Input } from "../../store";
import { Agent } from "../../../../../../../redux/agents/store";

interface SuggestionsListProps {
  agent: Agent;
  onSelect: (input: Input) => void;
}

export function SuggestionsList({ agent, onSelect }: SuggestionsListProps) {
  const coreInstructionKeys = agent.customProperties
    ? Object.keys(agent.customProperties)
    : [];
    console.log(coreInstructionKeys)
    console.log(agent.coreInstructions)
  return (
    <div className="absolute left-0 right-0 mt-1 bg-gray-800 border sm:max-w-[20vw] border-gray-700 rounded-md shadow-lg overflow-hidden">
      {coreInstructionKeys.map((key) => (
        <button
          key={key} // Using the key as the key for each list item
          onClick={() => {
            // Create the Input object with correct properties
            const key1: Input = {
              label: key, // Set the label to the key name
              id: "", // Set the id dynamically based on your needs (if needed)
              value: agent.customProperties?.[key] || "",// Get the value from coreInstructions
            };
            onSelect(key1); // Pass the key1 object to the onSelect function
          }}
          className="w-full px-3 py-1.5 text-sm text-left text-gray-100 hover:bg-gray-700 focus:outline-none"
        >
          {key} {/* Display the key name */}
        </button>
      ))}
    </div>
  );
}
