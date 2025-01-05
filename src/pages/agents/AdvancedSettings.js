import React, { useState } from "react";

const AdvancedSettings = () => {
    const [temperature,setTemperature] = useState(0);
    return (
        <div className="bg-gray-50 w-full">
            <div className="bg-white rounded-sm  h-[97vh]  overflow-auto scroll sm:border border-gray-500  shadow-sm p-4 space-y-4">
                {/* Header */}
                {/* <h2 className="text-xl font-semibold">Advanced settings</h2> */}

                {/* Suggest Replies */}
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="font-medium text-gray-800">Suggest replies</h3>
                        <p className="text-sm text-gray-500">
                            Suggest replies after every agent comment.
                        </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className=""/>
                    </label>
                </div>

                {/* Language Model */}
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="font-medium text-gray-800">Language model</h3>
                        <p className="text-sm text-gray-500">
                            Select the LLM that powers your agent's reasoning, decision-making, and text generation.
                        </p>
                    </div>
                    <select className="border border-gray-300 rounded-md p-2 text-sm text-blue-600">
                        <option>GPT 4o mini (Latest)</option>
                        <option>GPT 3.5</option>
                        <option>Custom Model</option>
                    </select>
                </div>

                {/* Temperature */}
                <div className="space-y-2">
                    <h3 className="font-medium text-gray-800">Temperature</h3>
                    <p className="text-sm text-gray-500">
                        Lower makes the agent more precise and predictable, while higher encourages diverse and creative behavior.
                    </p>
                    <div className="flex items-center text-blue-600 space-x-4">
                        <input
                            type="range"
                            value={temperature}
                            onChange={(e) => setTemperature(e.target.value)}
                            min="0"
                            max="1"
                            step="0.1"
                            className="w-full bg-gray-400"
                        />
                        <input
                            type="number"
                            min="0"
                            max="1"
                            value={temperature}
                            onChange={(e) => setTemperature(e.target.value)}
                            step="0.1"
                            className="w-16 border border-gray-300 rounded-md p-1 text-center text-blue-600 text-sm"
                            defaultValue="0"
                        />
                    </div>
                </div>

                {/* Agent Timeout */}
                <div className="space-y-2">
                    <h3 className="font-medium text-gray-800">Agent timeout time</h3>
                    <p className="text-sm text-gray-500">
                        How long can an agent work on a task before timing out. Setting this to 24 hours will cause your agent to have to "wake up" when initiating actions.
                    </p>
                    <input
                        type="number"
                        placeholder="24"
                        className="border border-gray-300  text-blue-600  rounded-md p-2 w-32 text-sm"
                    />
                </div>

                {/* Naming Instructions */}
                <div className="space-y-2 hidden sm:block">
                    <h3 className="font-medium text-gray-800">Instructions for naming tasks</h3>
                    <p className="text-sm text-gray-500">
                        After you create a task, the agent automatically names it. Here you can provide additional instructions for how the agent should choose a name.
                    </p>
                    <textarea
                        className="border bg-gray-200  border-gray-300 text-blue-600  rounded-md p-2 w-full text-sm"
                        placeholder="Enter naming instructions..."
                    ></textarea>
                </div>


                <div className="space-y-2 hidden sm:block">
                    <h3 className="font-medium text-gray-800">Guide for using agent</h3>
                    <p className="text-sm text-gray-500">
                    Provide instructions for how to use or set up this agent. This will be visible on the 'New task' page.                    </p>
                    <textarea
                        className="border bg-gray-200 border-gray-300 text-blue-600  rounded-md p-2 w-full text-sm"
                        placeholder="Setting this agent up instructions..."
                    ></textarea>
                </div>
                <div className="space-y-2 hidden sm:block">
                    <h3 className="font-medium text-gray-800">Welcome message</h3>
                    <p className="text-sm text-gray-500">
                    Set up a message that the agent will always send at the beginning of a task. Your agent will see this in its context.            </p>
                    <textarea
                        className="border bg-gray-200 border-gray-300 text-blue-600  rounded-md p-2 w-full text-sm"
                        placeholder="Enter welcome message..."
                    ></textarea>
                </div>
                {/* Upgrade Option */}
                {/* <div className="flex justify-between items-center bg-gray-100 rounded-md p-4">
                    <div>
                        <h3 className="font-medium text-gray-800">Unlock AI workforce feature</h3>
                        <p className="text-sm text-gray-500">Upgrade to business or book onboarding</p>
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm">
                        Upgrade
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default AdvancedSettings;
