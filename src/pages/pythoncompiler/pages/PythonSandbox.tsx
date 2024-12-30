import { useState } from "react";
import { Terminal as TerminalIcon } from "lucide-react";
// import { Button } from "../components/Button";
import { TextArea } from "../components/TextArea";
import { Terminal } from "../components/Terminal";
import { InputCollection } from "../components/InputCollection";
import { usePythonExecution } from "../hooks/usePythonExecution";
import { Button, Input, message, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import AgentToolUsage from "../../tools/components/ToolUsage";
import { InputList } from "../../tools/components/components/InputList";
import { EditablePrompt } from "../../tools/components/components/EditablePrompt";
import {
  BackupOutlined,
  ExitToAppOutlined,
  FullscreenExit,
  PlayArrowOutlined,
  SkipPreviousOutlined,
  SkipPreviousRounded,
} from "@mui/icons-material";

const DEFAULT_CODE =
  '# Example: Multiple inputs\nname = input("What is your name? ")\nage = input("What is your age? ")\nprint("Hello {name}, you are {age} years old!")\n';

export function PythonSandbox() {
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

  interface Input {
    id: string;
    value: string;
  }

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

  const saveTool = async () => {
    const url = process.env.REACT_APP_API_URL + "/api/v1/tools/new";
    if (toolName == "" || toolDescription == "" || code == "") {
      message.error("Please input all fields.");
      return;
    }
    const payload = {
      name: toolName,
      description: toolDescription,
      toolType: type,
      content: code,
    };
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

  // need to later route through backend
  const testLLM = async () => {
    if (code == "") {
      message.info("Enter prompts to execute");
      return;
    }
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
    const url = "http://api-p-sirius.aqumenlabs.ai:8080/api/v1/tools/run_tool_llm";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.text(); // Get the response as a plain string
      setLLMresponse(data); // Set the response text
    } else {
      // Handle the error (e.g., logging it)
      console.error("Error:", response.statusText);
      setLLMresponse("Error occurred while fetching data");
    }
  };
  const [llmResponse, setLLMresponse] = useState("");
  const { TabPane } = Tabs;
  const [type, setType] = useState("Python");

  const [cursorPosition, setCursorPosition] = useState(0);

  const handlePromptChange = (value: string) => {
    setCode(value);
  };

  const handleCursorChange = (position: number) => {
    setCursorPosition(position);
    const lastTwoChars = code.slice(position - 2, position);
  };

  const insertVariable = (inputId: string) => {
    const before = code.slice(0, cursorPosition - 2);
    const after = code.slice(cursorPosition);
    const newPrompt = `${before}{{${inputId}}}${after}`;
    setCode(newPrompt);
  };
  return (
    <div className=" flex p-2 px-6 justify-between  ">
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
              <h1 className="text-xl  text-gray-800">Tool Writer</h1>
              <h1 className="text-sm italic hidden sm:block text-gray-600">
                Write and test your tool here!
              </h1>
            </div>

            <Button type="primary" className="text-xs" onClick={() => saveTool()}>
              Save Tool
            </Button>
          </div>

          <Input
            placeholder="Enter Tool Name"
            value={toolName}
            onChange={(e) => setToolName(e.target.value)}
            className="bg-gray-200"
          />

          {/* Input Box for Tool Description */}
          <Input
            placeholder="Enter Tool Description"
            value={toolDescription}
            onChange={(e) => setToolDescription(e.target.value)}
             className="bg-gray-200"
          />

          <Button
            className={`text-white  hover:bg-blue-400 ${
              type == "Python" ? "bg-blue-700" : "bg-blue-400"
            }`}
            onClick={() => setType("Python")}
          >
            Python Tool
          </Button>
          <Button
            className={`ml-2 text-white hover:bg-blue-400 ${
              type == "Python" ? "bg-blue-400" : "bg-blue-700"
            }`}
            onClick={() => setType("LLM")}
          >
            LLM Tool
          </Button>
          {/* {type=="LLM" && (
            <BoltNewTool/>
          )} */}
          {type == "Python" && (
            <InputCollection
              onInputsCollected={(inputs) => {
                handlePrepareInputs(inputs);
                setShowInputCollection(false);
              }}
            />
          )}

          {type == "LLM" && (
            <div>
              {/* <TextArea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={10}
                className="font-mono text-sm text-gray-500"
                placeholder="Write your prompt here..."
              /> */}
              <InputList
                inputs={inputs}
                onInputChange={handleInputChange}
                onAddInput={addInput}
                onRemoveInput={removeInput}
              />
              {""}
              <span className="text-sm text-blue-500 mt-2 p-1  block">
                {
                  "Write your prompt here... Use {{...}} to insert input variables"
                }
              </span>
              <EditablePrompt
                value={code}
                onChange={handlePromptChange}
                onCursorChange={handleCursorChange}
                placeholder="Write your prompt here... Use {{ to insert input variables"
              />
              <Button  type='primary' className="mt-1" onClick={() => testLLM()}>
                Test LLM{" "}
              </Button>
              <TextArea
                value={llmResponse}
                rows={8}
                className="font-mono text-sm mt-2 text-gray-200"
                placeholder="Your prompt response will be shown here..."
              />
            </div>
          )}

          {type == "Python" && (
            <div className="space-y-6">
              <TextArea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={10}
                className="font-mono text-sm bg-gray-300"
                placeholder="Write your Python code here..."
              />

              <>
                <div className="flex gap-4">
                  <Button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    // variant="primary"
                    className=""
                  >
                    <PlayArrowOutlined/> {isRunning ? "Running..." : "Run Code"}
                  </Button>

                  {/* <Button
                    onClick={() => {
                      setShowInputCollection(true);
                    }}
                    // variant="secondary"
                  >
                    Clear & Reset
                  </Button> */}
                </div>

                <div className="bg-white shadow rounded-lg">
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

                  <h2 className=" font-semibold text-gray-200 mb-4 mt-2">Output</h2>
                  <Terminal
                    output={output}
                    onInput={() => {}}
                    isWaitingForInput={false}
                  />
                </div>
              </>
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
