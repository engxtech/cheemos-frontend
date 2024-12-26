import React, { useEffect, useState } from "react";
import { Terminal as TerminalIcon, Text } from "lucide-react";

import { Input, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Description } from "@mui/icons-material";
import { TextArea } from "../pythoncompiler/components/TextArea";
import { InputCollection } from "../pythoncompiler/components/InputCollection";
import { Button } from "../pythoncompiler/components/Button";
import { Terminal } from "../pythoncompiler/components/Terminal";
import { usePythonExecution } from "../pythoncompiler/hooks/usePythonExecution";

const DEFAULT_CODE =
  '# Example: Multiple inputs\nname = input("What is your name? ")\nage = input("What is your age? ")\nprint("Hello {name}, you are {age} years old!")\n';

export function OneTool() {
  const [code, setCode] = useState<string>("");
  const {
    output,
    setOutput,
    isRunning,
    preparedInputs,
    handlePrepareInputs,
    executeCode,
  } = usePythonExecution();
  const [showInputCollection, setShowInputCollection] = useState(true);
  const [toolName, setToolName] = useState<string>("");
  const [toolDescription, setToolDescription] = useState<string>("");
  const navigate = useNavigate();
  const handleRunCode = () => {
    // if (preparedInputs.length === 0) {
    //   setOutput("Please prepare inputs first.");
    //   return;
    // }
    executeCode(code);
  };
  const toolId = useParams().toolId;
  useEffect(() => {
    const fetchTool = async () => {
      const url = process.env.REACT_APP_API_URL + `/api/v1/tools/${toolId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (data.success) {
        setCode(data.data.content);
        setToolName(data.data.name);
        setToolDescription(data.data.description);
      }
    };
    fetchTool();
  }, []);

  const saveTool = async () => {
    if (toolName == "" || toolDescription == "" || code == "") {
      message.error("Please input all fields.");
      return;
    }
    const payload = {
      name: toolName,
      description: toolDescription,
      content: code,
    };
    const url = process.env.REACT_APP_API_URL + "/api/v1/tools/new";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (data.success) {
      message.success("Tool created successfully!");
      navigate("/tools");
    }
  };

  return (
    <div className="p-2 px-6">
      <div className="h-[98vh]  bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 text-sm border rounded-sm shadow-sm">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="flex justify-between items-center  mb-6">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl  text-gray-800">
                Tool Writer
              </h1>
              <h1 className="text-sm italic  text-gray-600">
                Write and test your tool here!
              </h1>
            </div>

            <Button className="text-xs" onClick={() => saveTool()}>
              Save Tool
            </Button>
          </div>
           {toolName}
           {" :  "}
           {toolDescription}
          <div className="space-y-6">
            <TextArea
              value={code}
              disabled
              rows={10}
              className="font-mono text-sm"
              placeholder="Write your Python code here..."
            />

            {showInputCollection ? (
              <InputCollection
                onInputsCollected={(inputs) => {
                  handlePrepareInputs(inputs);
                  setShowInputCollection(false);
                }}
              />
            ) : (
              <>
                <div className="flex gap-4">
                  <Button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    variant="primary"
                  >
                    {isRunning ? "Running..." : "Run Code"}
                  </Button>

                  <Button
                    onClick={() => {
                      setShowInputCollection(true);
                    }}
                    variant="secondary"
                  >
                    Clear & Reset
                  </Button>
                </div>

                <div className="bg-white shadow rounded-lg p-4">
                  {/* <div className="mb-4">
                  <h2 className="font-semibold text-gray-900 mb-2">
                    Prepared Inputs
                  </h2>
                  <div className=" text-gray-600">
                    {preparedInputs.map((input, index) => (
                      <div key={index}>
                        Input {index + 1}: {input}
                      </div>
                    ))}
                  </div>
                </div> */}

                  <h2 className=" font-semibold text-gray-900 mb-4">Output</h2>
                  <Terminal
                    output={output}
                    onInput={() => {}}
                    isWaitingForInput={false}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
