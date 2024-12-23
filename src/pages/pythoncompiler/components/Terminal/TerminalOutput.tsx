import React from 'react';

interface TerminalOutputProps {
  output: string;
}

export function TerminalOutput({ output }: TerminalOutputProps) {
  return <div>{output}</div>;
}