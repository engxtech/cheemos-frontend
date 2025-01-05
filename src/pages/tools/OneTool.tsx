import React, { useEffect, useState } from "react";
import { Terminal as TerminalIcon, Text } from "lucide-react";

import {  Button, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Description, PlayArrowOutlined } from "@mui/icons-material";
import { TextArea } from "../pythoncompiler/components/TextArea";
import { InputCollection } from "../pythoncompiler/components/InputCollection";
import { Terminal } from "../pythoncompiler/components/Terminal";
import { usePythonExecution } from "../pythoncompiler/hooks/usePythonExecution";
import AgentToolUsage from "./components/ToolUsage";
import { InputList } from "./components/components/InputList";
import { EditablePrompt } from "./components/components/EditablePrompt";
import { Input } from "../agents/createAgent/components/coreInstructions/store";

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
  const [type,setType] = useState<string>("Python");
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
        if(data.data.toolType!=null)setType(data.data.toolType);
      }
    };
    fetchTool();
  }, []);

  interface Input {
    id: string;
    value: string;
  }

  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState<Input[]>([{ id: "input1", value: "" }]);

  const handleInputChange = (id: string, value: string) => {
    setInputs(
      inputs.map((input) => (input.id === id ? { ...input, value } : input))
    );
  };

  const addInput = () => {
    const newId = `input${inputs.length + 1}`;
    setInputs([...inputs, { id: newId, value: "" }]);
  };

  const removeInput = (idToRemove: string) => {
    setInputs(inputs.filter((input) => input.id !== idToRemove));
  };
  const testLLM = async () => {
    if (code == "") {
      message.info("Enter prompts to execute");
      return;
    }
    setLoading(true);
    const substitutedContent = inputs.reduce((text, input) => {
      return text.replace(
        new RegExp(`\\{\\{${input.id}\\}\\}`, "g"),
        input.value || `[${input.id}]`
      );
    }, code);

    const payload = {
      inputValue: substitutedContent,
    };
    // update this url
    const url = process.env.REACT_APP_API_URL + "/api/v1/tools/run_tool_llm";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json(); // Get the response as a plain string
      setLLMresponse(data.data); // Set the response text
    } else {
      // Handle the error (e.g., logging it)
      console.error("Error:", response.statusText);
      setLLMresponse("Error occurred while fetching data");
    }
    setLoading(false);
  };
  const [llmResponse, setLLMresponse] = useState("");
  return (
    <div className=" flex sm:p-2 p-1 sm:px-6 justify-between  ">
      <div className=" overflow-x-auto  scroll h-[98vh] sm:w-[70%] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 text-sm border rounded-sm shadow-sm">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="flex justify-between items-center  mb-6">
            <div className="flex items-center gap-2">
            <span
                className="w-8 h-8 text-blue-600 text-2xl cursor-pointer"
                onClick={() => navigate("/tools")}
              >
                {" "}
                {"<"}{" "}
              </span>
              <h1 className="text-xl  text-gray-800">
                Tool Writer
              </h1>
              <h1 className="text-sm italic  text-gray-600">
               Test your tool here!
              </h1>
            </div>
          </div>
           {toolName}
           {" :  "}
           {toolDescription}
      
          {type == "Python" && (
            <>
              <InputCollection
                onInputsCollected={(inputs) => {
                  handlePrepareInputs(inputs);
                  setShowInputCollection(false);
                }}
              />

              <div className="space-y-3">
                <TextArea
                  value={code}
                  rows={10}
                  className="font-mono text-sm bg-gray-300"
                  placeholder="Write your Python code here..."
                />

                <>
                  <div className="flex gap-1">
                    <Button
                      onClick={handleRunCode}
                      disabled={isRunning}
                      // variant="primary"
                      className=""
                    >
                      <PlayArrowOutlined />{" "}
                      {isRunning ? "Running..." : "Run Code"}
                    </Button>
                  </div>

                  <div className="bg-white shadow rounded-lg">
                    <h2 className=" font-semibold text-gray-200 mb-1 mt-1 ml-1">
                      Output
                    </h2>
                    <Terminal
                      output={output}
                      onInput={() => {}}
                      isWaitingForInput={false}
                    />
                  </div>
                </>
              </div>
            </>
          )}

          {type == "LLM" && (
            <div>
              <InputList
                inputs={inputs}
                onInputChange={handleInputChange}
                onAddInput={addInput}
                onRemoveInput={removeInput}
              />
              {""}
              <span className=" text-blue-400 mt-1 p-1  text-xs italic block">
                {"Write prompt... Use {{ to insert input."}
              </span>
              <TextArea
                  value={code}
                  rows={10}
                  className="font-mono text-sm bg-gray-300"
                  placeholder="Write your Python code here..."
                />
              <Button type="primary" className="mt-1" onClick={() => testLLM()}>
                {loading ? "Running..." : "Test LLM"}
              </Button>
              <TextArea
                value={llmResponse}
                rows={8}
                className="font-mono text-sm mt-2 text-gray-200"
                placeholder="Your prompt response will be shown here..."
              />
            </div>
          )}
        </div>
        </div>
        <div className="w-[30%] hidden sm:block">
        <AgentToolUsage />
      </div>
    </div>
  );
}
