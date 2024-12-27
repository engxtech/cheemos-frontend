import React from 'react';

 interface Input {
  id: string;
  value: string;
}
interface SubstitutedPromptProps {
  content: string;
  inputs: Input[];
}

export function SubstitutedPrompt({ content, inputs }: SubstitutedPromptProps) {
  const parts = content.split(/(\{\{[^}]+\}\})/g);

  return (
    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Preview:</h3>
      <div className="whitespace-pre-wrap">
        {parts.map((part, index) => {
          if (part.match(/^\{\{[^}]+\}\}$/)) {
            return (
              <span
                key={index}
                className="inline-block bg-blue-100 border border-blue-200 rounded px-1.5 py-0.5 text-blue-700 text-sm"
              >
                {part}
              </span>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </div>
    </div>
  );
}