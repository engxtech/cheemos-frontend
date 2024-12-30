import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Input } from '../../store';
import { EditableLabel } from './EditableLabel';

interface InputListProps {
  inputs: Input[];
  onInputChange: (id: string, value: string) => void;
  onLabelChange: (id: string, label: string) => void;
  onAddInput: () => void;
  onRemoveInput: (id: string) => void;
}

export function InputList({
  inputs,
  onInputChange,
  onLabelChange,
  onAddInput,
  onRemoveInput
}: InputListProps) {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-5">
      <h2 className="text-lg font-medium text-gray-100 mb-4">Prepare Inputs</h2>
      
      <div className="space-y-3">
        {inputs.map((input) => (
          <div key={input.id} className="flex gap-3 items-start">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                <EditableLabel
                  value={input.label}
                  onChange={(newLabel) => onLabelChange(input.id, newLabel)}
                />
              </label>
              <input
                type="text"
                value={input.value}
                onChange={(e) => onInputChange(input.id, e.target.value)}
                className="w-full px-3 py-1.5 text-sm bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
                placeholder={`Enter ${input.label}`}
              />
            </div>
            <button
              onClick={() => onRemoveInput(input.id)}
              className="mt-6 p-1.5 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-md"
            >
              <Minus size={16} />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={onAddInput}
        className="mt-4 flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-400 hover:bg-gray-700 rounded-md"
      >
        <Plus size={16} />
        Add Input
      </button>
    </div>
  );
}