import React, { useState, useCallback } from 'react';
import { executePythonCode } from './pythonExecutor';
import { Terminal } from '@mui/icons-material';
import { TextArea } from '../small-components/text-area';
import { Button } from '../small-components/button';


export function PythonSandbox() {
  const [code, setCode] = useState<string>('# Write your Python code here\nprint("Hello, World!")');
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);

  const handleExecuteCode = useCallback(async () => {
    setIsRunning(true);
    setOutput('');
    const result = await executePythonCode(code);
    setOutput(result);
    setIsRunning(false);
  }, [code]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Terminal className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Python Sandbox</h1>
        </div>

        <div className="space-y-6">
          <TextArea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={10}
            className="font-mono text-sm"
            placeholder="Write your Python code here..."
          />

          <div className="flex gap-4">
            <Button
              onClick={handleExecuteCode}
              disabled={isRunning}
              variant="primary"
            >
              {isRunning ? 'Running...' : 'Run Code'}
            </Button>
            
            <Button
              onClick={() => setCode('')}
              variant="secondary"
            >
              Clear Code
            </Button>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Output</h2>
            <pre className="bg-gray-50 p-4 rounded-md font-mono text-sm whitespace-pre-wrap min-h-[100px] max-h-[300px] overflow-auto">
              {output || 'No output yet...'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}