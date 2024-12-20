declare global {
    interface Window {
      Sk: any;
    }
  }
  
  export async function executePythonCode(code: string): Promise<string> {
    let output = '';
  
    try {
      // Configure Skulpt
      window.Sk.configure({
        output: (text: string) => {
          output += text;
        },
        read: (filename: string) => {
          if (window.Sk.builtinFiles === undefined || 
              window.Sk.builtinFiles["files"][filename] === undefined) {
            throw "File not found: '" + filename + "'";
          }
          return window.Sk.builtinFiles["files"][filename];
        }
      });
  
      // Run the Python code
      await window.Sk.misceval.asyncToPromise(() => 
        window.Sk.importMainWithBody("<stdin>", false, code, true)
      );
  
      return output;
    } catch (err) {
      return output + '\nError: ' + (err as Error).toString();
    }
  }