declare global {
  interface Window {
    Sk: any;
  }
}

export class InputRequiredError extends Error {
  constructor() {
    super('Input required');
    this.name = 'InputRequiredError';
  }
}

export async function executePythonCode(
  code: string,
  handleInput: () => Promise<string>
): Promise<string> {
  let output = '';
  let inputRequired = false;

  try {
    window.Sk.configure({
      output: (text: string) => {
        output += text;
      },
      read: (filename: string) => {
        if (
          window.Sk.builtinFiles === undefined ||
          window.Sk.builtinFiles["files"][filename] === undefined
        ) {
          throw "File not found: '" + filename + "'";
        }
        return window.Sk.builtinFiles["files"][filename];
      },
      inputfun: async () => {
        inputRequired = true;
        const input = await handleInput();
        output += input + '\n';
        return input;
      },
      inputfunTakesPrompt: true,
    });

    await window.Sk.misceval.asyncToPromise(() =>
      window.Sk.importMainWithBody("<stdin>", false, code, true)
    );

    return output;
  } catch (err) {
    if (inputRequired) {
      throw new InputRequiredError();
    }
    return output + '\nError: ' + (err as Error).toString();
  }
}