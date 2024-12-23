import React, { useRef, useEffect } from 'react';
import { TerminalInput } from './TerminalInput';
import { TerminalOutput } from './TerminalOutput';

interface TerminalProps {
  output: string;
  onInput: (input: string) => void;
  isWaitingForInput: boolean;
}

export function Terminal({ output, onInput, isWaitingForInput }: TerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div 
      ref={containerRef}
      className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm whitespace-pre-wrap min-h-[200px] max-h-[400px] overflow-auto"
    >
      <TerminalOutput output={output} />
      {isWaitingForInput && <TerminalInput onInput={onInput} />}
    </div>
  );
}