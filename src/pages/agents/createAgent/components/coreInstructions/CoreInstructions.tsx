import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux";
import { PromptInput } from "./components/PromptInput";
import { Agent } from "../../../../../redux/agents/store";





const CoreInstructions = () => {
  let createAgent:Agent = useSelector((state: RootState) => state.agents.agent);
  return (
    <div className="border bg-gray-300 flex w-full justify-center ">
      <div className="bg-white  shadow-sm p-6 w-full ">
        <h2 className="text-2xl font-semibold text-gray-400 mb-4">Core Instructions</h2>
        <p className="text-sm text-gray-600 mb-6">
          Describe how your agent should work. It's recommended to provide examples of tasks it might receive and what to do.
        </p>
        {/* <Input.TextArea
          rows={20}
          value={createAgent.coreInstructions?._SYSTEM_CORE_INSTRUCTIONS_PROMPT}
          placeholder="e.g. You are a helpful, respectful and honest assistant. If you don't know the answer to a question, please don't share false information."
          className="mb-4  "
          onChange={(e) => {
            dispatch(
              setCreateAgent({
                ...createAgent,
                coreInstructions: {
                  ...createAgent.coreInstructions,
                  _SYSTEM_CORE_INSTRUCTIONS_PROMPT: e.target.value,
                },
                toolRetries:3
              })
            );
          }}
        /> */}
         <PromptInput agent ={createAgent}/>
      </div>
    </div>
  );
};

export default CoreInstructions;
