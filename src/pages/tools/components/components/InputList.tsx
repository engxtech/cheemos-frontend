import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from 'antd';
interface Input {
  id: string;
  value: string;
}

interface InputListProps {
  inputs: Input[];
  onInputChange: (id: string, value: string) => void;
  onAddInput: () => void;
  onRemoveInput: (id: string) => void;
}

export function InputList({ inputs, onInputChange, onAddInput, onRemoveInput }: InputListProps) {
  return (
    <div className="">
      {/* <h2 className="mb-2">Prepare Inputs</h2> */}
      
      <div className="space-y-4">
        {inputs.map((input) => (
          <div key={input.id} className="flex gap-4 rounded-md border p-3 items-start">
            <div className="flex-1">
              <label className="block text-sm font-medium  text-blue-700 mb-1">
                {input.id}
              </label>
              <input
                type="text"
                value={input.value}
                onChange={(e) => onInputChange(input.id, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter ${input.id}`}
              />
            </div>
            <button
              onClick={() => onRemoveInput(input.id)}
              className="mt-7 p-1 border text-red-600 hover:bg-red-50 rounded-md"
            >
              <Minus size={20} />
            </button>
          </div>
        ))}
      </div>

      <Button
        onClick={onAddInput}
        className="mt-4 flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md"
      >
        <Plus size={20} />
        Add Input
      </Button>
    </div>
  );
}