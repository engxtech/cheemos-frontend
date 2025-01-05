import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setCreateAgent } from "../../redux/agents/action";

const SubAgentUI = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [agentsList, setAgentsList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const createAgent = useSelector((state) => state.agent);
  const agentId = useParams().agentId;

  useEffect(() => {
    setLoading(true);
    const getAgents = async () => {
      const url = process.env.REACT_APP_API_URL + "/api/v1/user/agents";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setAgents(data.data.content);
      setLoading(false);
    };
    getAgents();
  }, [refresh]);

  const handleAddAgent = (agent) => {
    if (!agentsList.some((t) => t.id === agent.id)) {
      const updatedAgentsList = [...agentsList, agent];
      setAgentsList(updatedAgentsList);
      dispatch(
        setCreateAgent({
          ...createAgent,
          subagents: updatedAgentsList,
        })
      );
    }
  };

  const handleRemoveAgent = (id) => {
    const updatedAgentsList = agentsList.filter((agent) => agent.id !== id);
    setAgentsList(updatedAgentsList);
    dispatch(
      setCreateAgent({
        ...createAgent,
        subagents: updatedAgentsList,
      })
    );
  };

  return (
    <div className="flex bg-gray-50 border border-gray-500 h-[97vh] w-full">
      {/* Sidebar */}
      <aside className="w-1/3 bg-white  p-4 hidden sm:block">
        <h2 className="text-sm text-gray-200 mb-4">Added Sub-Agents</h2>
        {/* <button className="w-full py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                    + Add sub-agent
                </button> */}
        <div className="">
          {agentsList.map((agent) => (
            <div
              key={agent.id}
              className="flex items-center justify-between p-2 border  text-white rounded mb-2"
            >
              <div>
                <h4 className="font-medium text-gray-200">{agent.name}</h4>
                <p className="text-sm text-gray-400">{agent.description}</p>
              </div>
              {/* <button
                                onClick={() => handleRemoveTool(tool.id)}
                                className="text-red-500 hover:underline"
                            >
                                Remove
                            </button> */}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">Add new sub-agent</h2>
          <input
            type="text"
            placeholder="Search agent..."
            className="border border-gray-300 p-2 rounded w-1/3"
          />
        </div>

        {/* Agent List */}
        <ul className="space-y-4">
          {loading
            ? // Render skeleton loader when loading is true
              Array(5)
                .fill()
                .map((_, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-4 bg-white rounded shadow border animate-pulse"
                  >
                    <div className="w-1/2 bg-gray-300 h-4 rounded mb-2"></div>
                    {/* <div className="w-1/4 bg-gray-300 h-4 rounded mb-2"></div> */}
                    <div className="w-20 bg-gray-300 h-6 rounded"></div>
                  </li>
                ))
            : // Render the actual content when loading is false
              agents.map((agent, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-4 py-2 bg-white rounded shadow border"
                >
                  <div>
                    <h3 className="font-medium">{agent.name}</h3>
                    <p className="text-sm text-gray-500">{agent.description}</p>
                  </div>
                  {agentsList.some((t) => t.id === agent.id) ? (
                    <button
                      onClick={() => handleRemoveAgent(agent.id)}
                      className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                    >
                      -
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddAgent(agent)}
                      className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                    >
                      + 
                    </button>
                  )}
                </li>
              ))}
        </ul>
      </main>
    </div>
  );
};

export default SubAgentUI;
