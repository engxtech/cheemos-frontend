import React from 'react';

interface Input {
  id: string;
  value: string;
}

interface SuggestionsListProps {
  inputs: Input[];
  onSelect: (inputId: string) => void;
}

export function SuggestionsList({ inputs, onSelect }: SuggestionsListProps) {
  return (
    <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
      {inputs.map((input) => (
        <button
          key={input.id}
          onClick={() => onSelect(input.id)}
          className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none"
        >
          {input.id}
        </button>
      ))}
    </div>
  );
}