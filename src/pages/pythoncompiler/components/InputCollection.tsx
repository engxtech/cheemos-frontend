import React, { useState } from 'react';
import { Button } from './Button';
import { TextArea } from './TextArea';

interface InputCollectionProps {
  onInputsCollected: (inputs: string[]) => void;
}

export function InputCollection({ onInputsCollected }: InputCollectionProps) {
  const [inputs, setInputs] = useState<string[]>(['']);

  const addInput = () => {
    setInputs([...inputs, '']);
  };

  const updateInput = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const removeInput = (index: number) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  };

  const handleSubmit = () => {
    const filteredInputs = inputs.filter(input => input.trim() !== '');
    onInputsCollected(filteredInputs);
  };

  return (
    <div className="space-y-4 text-sm">
      <h2 className=" font-semibold text-gray-900">Prepare Inputs</h2>
      <p className="text-sm text-gray-600">Add all the inputs your code will need in order:</p>
      
      {inputs.map((input, index) => (
        <div key={index} className="flex gap-2 items-start">
          <div className="flex-1">
            <TextArea
              value={input}
              onChange={(e) => updateInput(index, e.target.value)}
              placeholder={`Input ${index + 1}`}
              rows={1}
            />
          </div>
          <Button
            variant="secondary"
            onClick={() => removeInput(index)}
            className="mt-1"
          >
            Remove
          </Button>
        </div>
      ))}
      
      <div className="flex gap-4">
        <Button variant="secondary" onClick={addInput}>
          Add Input
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Use Inputs
        </Button>
      </div>
    </div>
  );
}