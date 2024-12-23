import React, { useRef, useEffect } from 'react';

interface TerminalInputProps {
  onInput: (input: string) => void;
}

export function TerminalInput({ onInput }: TerminalInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      onInput(inputRef.current.value);
      inputRef.current.value = '';
    }
  };

  return (
    <div className="flex items-center">
      <span className="mr-2">{'>'}</span>
      <input
        ref={inputRef}
        type="text"
        className="flex-1 bg-transparent border-none outline-none text-green-400"
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </div>
  );
}