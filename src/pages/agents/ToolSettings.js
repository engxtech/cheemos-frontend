import { Button, Card, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCreateAgent } from "../../redux/agents/action";
import { AddOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ToolSettingsAgent = () => {
  const [tools, setTools] = useState([]);
  const [toolsList, setToolsList] = useState([]); // Added tools list
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const createAgent = useSelector((state) => state.agents.agent);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Filter tools to match the IDs in toolsListIds and set the toolsList
  //   if(tools.length === 0 || !toolsListIds) return;
  //   const updatedToolsList = tools.filter((tool) => toolsListIds.includes(tool.id));
  //   setToolsList(updatedToolsList);
  // }, [tools, toolsListIds]);

  useEffect(() => {
    setLoading(true);
    const getAgents = async () => {
      const url = process.env.REACT_APP_API_URL + "/api/v1/tools/all";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setTools(data.data.content);
      setLoading(false);
    };
    getAgents();
  }, [refresh]);
  

  useEffect(() => {
    // Ensure createAgent and toolsList exist
    if (createAgent?.toolsList) {
      const updatedToolsList = tools.filter((tool) => createAgent?.toolsList.includes(tool.id));
      setToolsList(updatedToolsList);
    }
  }, [createAgent,tools]);

  const handleAddTool = (tool) => {
    if (!toolsList.some((t) => t.id === tool.id)) {
      const updatedToolsList = [...toolsList, tool];
      setToolsList(updatedToolsList);
      const updatedToolsListIds = [...toolsList, tool].map((t) => t.id);
      dispatch(
        setCreateAgent({
          ...createAgent,
          toolsList: updatedToolsListIds,
          toolsListCore:updatedToolsList //adding for frontend purpose in core instructions
        })
      );
    }
  };

  const handleRemoveTool = (id) => {
    const updatedToolsList = toolsList.filter((tool) => tool.id !== id);
    setToolsList(updatedToolsList);
    const updatedToolsListIds = toolsList.filter((tool) => tool.id !== id).map((tool) => tool.id);
    dispatch(
      setCreateAgent({
        ...createAgent,
        toolsList: updatedToolsListIds,
        toolsListCore:updatedToolsList
      })
    );
  };

  return (
    <div className="flex  bg-gray-50 sm:border w-full  border-gray-500 h-[97vh]">
      {/* Sidebar */}
      <aside className="w-1/3 hidden sm:block bg-white -r p-4">
        <h2 className="text-sm text-gray-200 mb-4">Tools Added</h2>
        <div>
          {toolsList.map((tool) => (
            <div
              key={tool.id}
              className="flex items-center justify-between p-2 border rounded mb-2"
            >
              <div>
                <h4 className="font-medium text-gray-200">{tool.name}</h4>
                <p className="text-sm text-gray-400">{tool.description}</p>
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

      {/* Main Section */}
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">Add new tool</h2>
          <input
            type="text"
            placeholder="Search tool.."
            className="border p-2 rounded w-1/3"
          />
        </div>

        {/* Tabs */}
        <div className="mt-6">
          <button className="py-2 px-4 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Your tools
          </button>
          <button className="py-2 px-4 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
            All templates
          </button>
        </div>

        {/* Tool Cards */}
        <div className="mt-6 grid grid-cols-1 gap-4">
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
            : tools.map((tool) => (
                <div
                  key={tool.id}
                  className="flex items-center justify-between p-4 py-2 rounded-lg bg-white border"
                >
                  <div className="flex items-center">
                    {/* Icon */}
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                      📊
                    </div>
                    {/* Tool Info */}
                    <div>
                      <h3 className="font-medium">{tool.name}</h3>
                      <p className="text-sm text-gray-500">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                  {toolsList.some((t) => t.id === tool.id) ? (
                    <button
                      onClick={() => handleRemoveTool(tool.id)}
                      className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                    >
                      -
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddTool(tool)}
                      className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                    >
                      +
                    </button>
                  )}
                </div>
              ))}
        </div>
        <div className="p-6 flex  justify-center space-x-2 border-t border-gray-500 ">
          <Button
            type="primary"
            className="bg-blue-500"
            onClick={() => navigate("../instructions")}
          >
            Prev
          </Button>
          <Button
            type="primary"
            className="bg-blue-500"
            onClick={() => navigate("../configure-templates")}
          >
            Next
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ToolSettingsAgent;
