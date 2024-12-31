import React, { useState } from "react";
import { Input, Tool } from "../store";
import { EditablePrompt } from "./EditablePrompt";
import { SuggestionsList } from "./suggestions/SuggestionsList";
import { ToolSuggestions } from "./suggestions/ToolSuggestions";
import { Agent } from "../../../../../../redux/agents/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../redux";
import { setCreateAgent } from "../../../../../../redux/agents/action";

interface PromptInputProps {
  agent: Agent;
}

export function PromptInput({ agent }: PromptInputProps) {
  const [showVariables, setShowVariables] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const createAgent = useSelector((state: RootState) => state.agents.agent);
  const [cursorPosition, setCursorPosition] = useState(createAgent.coreInstructions?._SYSTEM_CORE_INSTRUCTIONS_PROMPT?.length || 0);
  const dispatch = useDispatch();
  const handlePromptChange = (value: string) => {
    dispatch(
      setCreateAgent({
        ...createAgent,
        coreInstructions: {
          ...createAgent.coreInstructions,
          _SYSTEM_CORE_INSTRUCTIONS_PROMPT: value,
        },
        toolRetries: 3,
      })
    );
    setCursorPosition(value.length || 0); //can be removed too
    
    // #change this condition to show when the value at cursor postion is / or {{
    if (value.charAt(cursorPosition) === '/') {
      setShowTools(true);
      setShowVariables(false);
      return;
    }

    if (value.charAt(cursorPosition) === '/') {
      setShowTools(true);
      setShowVariables(false);
      return;
    }

    if (value.charAt(cursorPosition) === '@') {
      setShowVariables(true);
      setShowTools(false);
      return;
    }

    setShowTools(false);
    setShowVariables(false);
  };

  const handleCursorChange = (position: number) => {
    setCursorPosition(position);
  };

  const insertVariable = (input: Input) => {
    const before =
      createAgent.coreInstructions?._SYSTEM_CORE_INSTRUCTIONS_PROMPT?.slice(
        0,
        cursorPosition - 1
      ) || "";
    const after =
      createAgent.coreInstructions?._SYSTEM_CORE_INSTRUCTIONS_PROMPT?.slice(
        cursorPosition
      ) || "";
    const variableText = `{{${input.label}}}`;
    const newPrompt = `${before}${variableText}${after}`;
    dispatch(
      setCreateAgent({
        ...createAgent,
        coreInstructions: {
          ...createAgent.coreInstructions,
          _SYSTEM_CORE_INSTRUCTIONS_PROMPT: newPrompt,
        },
        toolRetries: 3,
      })
    );
    setCursorPosition(cursorPosition - 2 + variableText.length);
    setShowVariables(false);
  };

  const insertTool = (tool: Tool) => {
    const before =
      createAgent.coreInstructions?._SYSTEM_CORE_INSTRUCTIONS_PROMPT?.slice(
        0,
        cursorPosition - 1
      ) || "";
    const after =
      createAgent.coreInstructions?._SYSTEM_CORE_INSTRUCTIONS_PROMPT?.slice(
        cursorPosition
      ) || "";
    const toolText = `[${tool.name} tool(Node Type:${tool.toolType})]`;
    const newPrompt = `${before}${toolText}${after}`;
    dispatch(
      setCreateAgent({
        ...createAgent,
        coreInstructions: {
          ...createAgent.coreInstructions,
          _SYSTEM_CORE_INSTRUCTIONS_PROMPT: newPrompt,
        },
        toolRetries: 3,
      })
    );
    setCursorPosition(cursorPosition - 1 + toolText.length);
    setShowTools(false);
  };

  return (
    <div className="relative space-y-4 ">
      <div className="relative">
        {showVariables && (
          <SuggestionsList agent={agent} onSelect={insertVariable} />
        )}

        {showTools && <ToolSuggestions agent={agent} onSelect={insertTool} />}
        <EditablePrompt
          value={createAgent.coreInstructions?._SYSTEM_CORE_INSTRUCTIONS_PROMPT}
          onChange={handlePromptChange}
          onCursorChange={handleCursorChange}
          cursorPosition={cursorPosition}
          placeholder="Write your prompt here... Use / for tools and {{ for variables"
        />
      </div>

      {/* <PromptPreview content={prompt} agent={agent} /> */}
    </div>
  );
}
