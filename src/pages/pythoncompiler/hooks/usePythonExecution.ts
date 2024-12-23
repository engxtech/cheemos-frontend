import { useState, useCallback } from 'react';
import { executePythonCode, InputRequiredError } from '../utils/pythonExecutor';

export function usePythonExecution() {
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [preparedInputs, setPreparedInputs] = useState<string[]>([]);
  const [currentInputIndex, setCurrentInputIndex] = useState(0);

  const handlePrepareInputs = useCallback((inputs: string[]) => {
    setPreparedInputs(inputs);
    setCurrentInputIndex(0);
  }, []);

  const getInput = useCallback(() => {
    return new Promise<string>((resolve) => {
      const input = preparedInputs[currentInputIndex];
      setCurrentInputIndex(prev => prev + 1);
      resolve(input);
    });
  }, [preparedInputs, currentInputIndex]);

  const executeCode = useCallback(async (code: string) => {
    setIsRunning(true);
    setOutput('');
    try {
      const result = await executePythonCode(code, getInput);
      setOutput(result);
    } catch (err) {
      if (!(err instanceof InputRequiredError)) {
        setOutput(prev => prev + '\nError: ' + (err as Error).toString());
      }
    } finally {
      setIsRunning(false);
    }
  }, [getInput]);

  return {
    output,
    setOutput,
    isRunning,
    preparedInputs,
    handlePrepareInputs,
    executeCode
  };
}