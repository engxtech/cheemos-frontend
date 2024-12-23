import { Card, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCreateAgent } from "../../redux/agents/action";

const ToolSettingsAgent = () => {
    const [tools, setTools] = useState([]);
    const [toolsList, setToolsList] = useState([]); // Added tools list
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

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
            setTools(data);
            setLoading(false);
        };
        getAgents();
    }, [refresh]);

    const dispatch =useDispatch()
    const createAgent =useSelector((state)=>state.agent)
    useEffect(() => {
        // Ensure createAgent and toolsList exist
        if (createAgent?.toolsList) {
            setToolsList(createAgent.toolsList);
        }
    }, [createAgent]);
    
    const handleAddTool = (tool) => {
        if (!toolsList.some((t) => t.id === tool.id)) {
            const updatedToolsList = [...toolsList, tool];
            setToolsList(updatedToolsList);
            dispatch(setCreateAgent({
                ...createAgent,
                toolsList: updatedToolsList,
            }));
        }
    };
    
    const handleRemoveTool = (id) => {
        const updatedToolsList = toolsList.filter((tool) => tool.id !== id);
        setToolsList(updatedToolsList);
        dispatch(setCreateAgent({
            ...createAgent,
            toolsList: updatedToolsList,
        }));
    };
    

    return (
        <div className="flex bg-gray-50 border w-full rounded-md">
            {/* Sidebar */}
            <aside className="w-1/3 bg-white border-r p-4">
                <h2 className="text-sm text-gray-500 mb-4">Tools Added</h2>
                <div>
                    {toolsList.map((tool) => (
                        <div
                            key={tool.id}
                            className="flex items-center justify-between p-2 border rounded mb-2"
                        >
                            <div>
                                <h4 className="font-medium text-gray-700">{tool.name}</h4>
                                <p className="text-sm text-gray-500">{tool.description}</p>
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
                        placeholder="Search for tool..."
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
                    {tools.map((tool) => (
                        <div
                            key={tool.id}
                            className="flex items-center justify-between p-4 rounded-lg bg-white border"
                        >
                            <div className="flex items-center">
                                {/* Icon */}
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                                    📊
                                </div>
                                {/* Tool Info */}
                                <div>
                                    <h3 className="font-medium">{tool.name}</h3>
                                    <p className="text-sm text-gray-500">{tool.description}</p>
                                </div>
                            </div>
                            {toolsList.some((t) => t.id === tool.id) ? (
                                <button
                                    onClick={() => handleRemoveTool(tool.id)}
                                    className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleAddTool(tool)}
                                    className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                                >
                                    + Add
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ToolSettingsAgent;
