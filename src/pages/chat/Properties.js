import React, { useEffect, useState } from "react";
import { Tag, Tooltip, Button } from "antd";
import {
  CalendarOutlined,
  BookOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";

const PropertiesPanel = () => {
  const [agent, setAgent] = useState();
  const agentId = useParams().agentId;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchAgentDetails = async () => {
      const url = process.env.REACT_APP_API_URL + `/api/v1/agent/${agentId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAgent(data.data);
      }
    };
    setLoading(false);
    fetchAgentDetails();
  }, []);
  // const [darkMode, setIsDarkMode] = useState(false);

  // useEffect(() => {
    // Check localStorage for the "dark" key and set the theme accordingly
    const darkMode = localStorage.getItem("darkmode") === "true";
  //   setIsDarkMode(darkMode);
  // }, []);
  return (
    <div className={`p-6   sm:w-[23vw] w-[95vw] sm:h-screen h-[90vh] ${darkMode?"text-gray-200 bg-gray-900":"text-gray-600 sm:border bg-white"}`}>
      {/* Triggered By */}
      <div className="mb-4">
        <h3 className=" text-xs mb-1">Triggered by</h3>
        <p className="text-blue-500 text-xs ">{agent && agent.name}</p>
      </div>

      {/* Status */}
      <div className="mb-4">
        <h3 className="text-xs mb-1">Status</h3>
        <Tag color="blue" className="text-sm">
          Active
        </Tag>
      </div>

      {/* Labels */}
      <div className="mb-4">
        <h3 className=" text-xs mb-1">Labels</h3>
        <p className="">No labels</p>
        <Button type="link" className="p-0">
          + Add label
        </Button>
      </div>

      {/* Date Created */}
      <div className="mb-4">
        <h3 className=" text-xs mb-1">Date created</h3>
        <p className=" text-sm ">{agent && agent.createdAt}</p>
      </div>

      {/* Credits */}
      {/* <div className="mb-4">
        <h3 className="text-gray-600 text-xs mb-1">Credits</h3>
        <Tooltip title="Credits used by this action">
          <p className="text-black ">8.3</p>
        </Tooltip>
      </div> */}

      {/* Schedule */}
      <div className="mb-4">
        <h3 className=" text-xs mb-1">Schedule</h3>
        <p className="">No scheduled actions</p>
      </div>

      {/* Connected Tools */}
      <div className="min-h-[10vh]">
        <h3 className="text-xs mb-1">Connected tools</h3>
        {agent &&
          agent.toolsList &&
          agent.toolsList.map((tool, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <BookOutlined className="text-xs" />
              <span className="text-xs">Read PDF</span>
            </div>
          ))}
      </div>
      <div className="min-h-[20vh]">
        <h3 className=" text-xs mb-1">Connected Subagents</h3>
        {agent &&
          agent.subAgents &&
          agent.subAgents.map((tool, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <BookOutlined className="text-xs" />
              <span className="text-xs">Read PDF</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PropertiesPanel;
