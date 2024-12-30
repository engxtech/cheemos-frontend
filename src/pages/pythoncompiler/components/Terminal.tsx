import React, { useRef, useEffect } from 'react';

interface TerminalProps {
  output: string;
  onInput: (input: string) => void;
  isWaitingForInput: boolean;
}

export function Terminal({ output, onInput, isWaitingForInput }: TerminalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isWaitingForInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isWaitingForInput]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [output]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      onInput(inputRef.current.value);
      inputRef.current.value = '';
    }
  };

  return (
    <div 
      ref={containerRef}
      className="bg-gray-900 text-blue-400 p-4 rounded-md font-mono text-sm whitespace-pre-wrap min-h-[200px] max-h-[400px] overflow-auto"
    >
      <div>{output}</div>
      {isWaitingForInput && (
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
      )}
    </div>
  );
}