import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux";
import { Agent } from "../../../../../redux/agents/store";
import { Button, Input, Switch } from "antd";
import { useNavigate } from "react-router-dom";
import { setCreateAgent } from "../../../../../redux/agents/action";

const PlanningPrompt = () => {
  let createAgent: Agent = useSelector(
    (state: RootState) => state.agents.agent
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="sm:border border-gray-500 h-[97vh] bg-gray-300 flex w-full justify-center ">
      <div className="bg-white  shadow-sm p-5 w-full ">
        <h2 className="text-2xl font-semibold text-gray-400 mb-2">
          Planning Prompt
        </h2>
        <div className="flex justify-between">
          <p className="text-sm hidden sm:block text-gray-500 mb-2">
            Describe how your agent should work. It's recommended to provide
            examples of tasks it might receive and what to do.
          </p>
          <Switch
            checked={createAgent.useUserPlanningPrompt}
            onChange={(checked) => {
              dispatch(
                setCreateAgent({
                  ...createAgent,
                  useUserPlanningPrompt: checked,
                })
              );
            }}
            className="bg-gray-200 mr-1 mb-1"
            checkedChildren="On"
            unCheckedChildren="Off"
          />
        </div>

        <Input.TextArea
          rows={25}
          value={createAgent.coreInstructions?._SYSTEM_TASK_DECOMPOSE_PROMPT}
          placeholder="e.g. You are a helpful, respectful and honest assistant. If you don't know the answer to a question, please don't share false information."
          className="w-full h-[72vh] px-3 py-2 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-auto whitespace-pre-wrap text-sm text-gray-100"
          onChange={(e) => {
            dispatch(
              setCreateAgent({
                ...createAgent,
                coreInstructions: {
                  ...createAgent.coreInstructions,
                  _SYSTEM_TASK_DECOMPOSE_PROMPT: e.target.value,
                },
                toolRetries: 3,
              })
            );
          }}
        />
        <div className="p-6 flex  justify-center space-x-2 border-t border-gray-500 ">
          <Button
            type="primary"
            className="bg-blue-500"
            onClick={() => navigate("../profile")}
          >
            Prev
          </Button>
          <Button
            type="primary"
            className="bg-blue-500"
            onClick={() => navigate("../tools")}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlanningPrompt;
