import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { setCreateAgent } from "../../redux/agents/action";

const AdvancedSettings = () => {
  const dispatch = useDispatch();
  const createAgent = useSelector((state: RootState) => state.agents.agent);
  
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
            <input type="checkbox" className="" />
          </label>
        </div>

        {/* Language Model */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium text-gray-800">Language model</h3>
            <p className="text-sm text-gray-500">
              Select the LLM that powers your agent's reasoning,
              decision-making, and text generation.
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
            Lower makes the agent more precise and predictable, while higher
            encourages diverse and creative behavior.
          </p>
          <div className="flex items-center text-blue-600 space-x-4">
            <input
              type="range"
              value={createAgent.temperature}
              onChange={(e) =>
                dispatch(
                  setCreateAgent({
                    ...createAgent,
                    temperature: e.target.value, //adding for frontend purpose in core instructions
                  })
                )
              }
              min="0"
              max="1"
              step="0.1"
              className="w-full bg-gray-400"
            />
            <input
              type="number"
              min="0"
              max="1"
              value={createAgent.temperature}
              onChange={(e) =>
                dispatch(
                  setCreateAgent({
                    ...createAgent,
                    temperature: e.target.value, //adding for frontend purpose in core instructions
                  })
                )
              }
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
            How long can an agent work on a task before timing out. Setting this
            to 24 hours will cause your agent to have to "wake up" when
            initiating actions.
          </p>
          <input
            type="number"
            placeholder="24"
            className="border border-gray-300  text-blue-600  rounded-md p-2 w-32 text-sm"
          />
        </div>

        {/* Naming Instructions */}
        <div className="space-y-2 hidden sm:block">
          <h3 className="font-medium text-gray-800">
            Instructions for naming tasks
          </h3>
          <p className="text-sm text-gray-500">
            After you create a task, the agent automatically names it. Here you
            can provide additional instructions for how the agent should choose
            a name.
          </p>
          <textarea
            className="border bg-gray-200  border-gray-300 text-blue-600  rounded-md p-2 w-full text-sm"
            placeholder="Enter naming instructions..."
          ></textarea>
        </div>

        <div className="space-y-2 hidden sm:block">
          <h3 className="font-medium text-gray-800">
           Slack Trigger
          </h3>
          <p className="text-sm text-gray-500">
            Enter slack bot Id to integrate Slack triggers. To look how to obtain slack bot Id read documentation in integrations section.
          </p>
          <textarea
          value={createAgent.slackBotId}
          onChange={(e) => dispatch(
              setCreateAgent({
                ...createAgent,
                slackBotId:e.target.value //adding for frontend purpose in core instructions
              })
            )}
            className="border bg-gray-200  border-gray-300 text-blue-600  rounded-md p-2 w-full text-sm"
            placeholder="Enter slack bot Id..."
          ></textarea>
        </div>

        <div className="space-y-2 hidden sm:block">
          <h3 className="font-medium text-gray-800">
            Jira Trigger
          </h3>
          <p className="text-sm text-gray-500">
          Enter jiraUrl  to integrate Jira triggers. To look how to obtain jiraUrl read documentation in integrations section.
          </p>
          <input
          value={createAgent.jiraUrl}
          onChange={(e) => dispatch(
              setCreateAgent({
                ...createAgent,
                 jiraUrl:e.target.value //adding for frontend purpose in core instructions
              })
            )}
            className="border bg-gray-200  border-gray-300 text-blue-600  rounded-md p-2 w-full text-sm"
            placeholder="Enter jiraUrl ..."
          ></input>
        </div>

        <div className="space-y-2 hidden sm:block">
          <h3 className="font-medium text-gray-800">
            Github Trigger
          </h3>
          <p className="text-sm text-gray-500">
          Enter GithubUrl  to integrate Github triggers. To look how to obtain GihtubUrl read documentation in integrations section.
          </p>
          <textarea
          value={createAgent.githubUrl}
          onChange={(e) => dispatch(
              setCreateAgent({
                ...createAgent,
                 githubUrl:e.target.value //adding for frontend purpose in core instructions
              })
            )}
            className="border bg-gray-200  border-gray-300 text-blue-600  rounded-md p-2 w-full text-sm"
            placeholder="Enter GithubUrl..."
          ></textarea>
        </div>

        <div className="space-y-2 hidden sm:block">
          <h3 className="font-medium text-gray-800">Guide for using agent</h3>
          <p className="text-sm text-gray-500">
            Provide instructions for how to use or set up this agent. This will
            be visible on the 'New task' page.{" "}
          </p>
          <textarea
            value={createAgent.agentGuideText}
            onChange={(e) => dispatch(
                setCreateAgent({
                  ...createAgent,
                   agentGuideText:e.target.value //adding for frontend purpose in core instructions
                })
              )}
            className="border bg-gray-200 border-gray-300 text-blue-600  rounded-md p-2 w-full text-sm"
            placeholder="Setting this agent up instructions..."
          ></textarea>
        </div>

        <div className="space-y-2 hidden sm:block">
          <h3 className="font-medium text-gray-800">Welcome message</h3>
          <p className="text-sm text-gray-500">
            Set up a message that the agent will always send at the beginning of
            a task. Your agent will see this in its context.{" "}
          </p>
          <textarea
          value={createAgent.welcomeMessage}
          onChange={(e) => dispatch(
            setCreateAgent({
              ...createAgent,
               welcomeMessage:e.target.value //adding for frontend purpose in core instructions
            })
          )}
            className="border bg-gray-200 border-gray-300 text-blue-600  rounded-md p-2 w-full text-sm"
            placeholder="Enter welcome message..."
          ></textarea>
        </div>

      </div>
    </div>
  );
};

export default AdvancedSettings;
