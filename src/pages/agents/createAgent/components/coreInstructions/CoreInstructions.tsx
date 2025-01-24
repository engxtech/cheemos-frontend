import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux";
import { PromptInput } from "./components/PromptInput";
import { Agent } from "../../../../../redux/agents/store";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { LeafyGreen, LeafyGreenIcon } from "lucide-react";
import { useState } from "react";
import { setCreateAgent } from "../../../../../redux/agents/action";

const CoreInstructions = () => {
  let createAgent: Agent = useSelector(
    (state: RootState) => state.agents.agent
  );
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleBeautifyPrompts = async () => {
    if (loading) return;
    setLoading(true);

    const payload = {
      "inputValue":createAgent.coreInstructions?._SYSTEM_CORE_INSTRUCTIONS_PROMPT,
    };

    const url =
      process.env.REACT_APP_API_URL + "/api/v1/tools/run_beautify_planner";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type":"application/json"
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    dispatch(
      setCreateAgent({
        ...createAgent,
        coreInstructions: {
          ...createAgent.coreInstructions,
          _SYSTEM_CORE_INSTRUCTIONS_PROMPT: data.data,
        },
        toolRetries: 3,
      })
    );
    console.log(data);
    setLoading(false);
  };

  return (
    <div className="sm:border border-gray-500 h-[97vh] bg-gray-300 flex w-full justify-center ">
      <div className="bg-white  shadow-sm p-5 w-full ">
        <h2 className="text-2xl font-semibold text-gray-400 mb-2">
          Core Instructions
        </h2>
        <p className="text-sm hidden sm:block text-gray-500 mb-2">
          Describe how your agent should work. It's recommended to provide
          examples of tasks it might receive and what to do.
        </p>
        <div className="flex justify-between">
          <div className="text-sm text-gray-400 mb-2 mt-2 italic">
            Use / to add tools and @ to add variables. Can't see tools , go and
            add them in the tools section. Create variables in the abilities
            section to use.
          </div>
          <div>
            <Button
              type="primary"
              className="text-xs mb-2 cursor-pointer"
              onClick={() => handleBeautifyPrompts()}
            >
              <LeafyGreenIcon />
              {!loading ? "Optimise with AI" : "Optimisation In Progress"}
            </Button>
          </div>
        </div>

        <PromptInput agent={createAgent} />
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

export default CoreInstructions;
