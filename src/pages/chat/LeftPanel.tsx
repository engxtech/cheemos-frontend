import React, { useEffect, useState } from "react";
import { Tabs, Badge, Avatar, Space, Button } from "antd";
import {
  ArrowLeftOutlined,
  FilterOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { Agent, ChatList } from "../../redux/agents/store";

const TasksPanel = () => {
  const [chatList, setChatList] = useState<ChatList[]>([]);

  const items = [
    {
      key: "1",
      label: <span className="text-sm font-medium">To Review</span>,
      children: (
        <div className="text-center text-gray-400">No tasks to review.</div>
      ),
    },
    {
      key: "2",
      label: (
        <span className="text-sm font-medium">
          All Tasks <Badge count={1} />
        </span>
      ),
      children: (
        <div className="mt-2 space-y-2">
          {/* <div className="text-gray-500 text-xs mb-1">Today</div> */}
          {chatList.map((chat) => (
            <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg" onClick={()=>navigate(`../${chat.id}`)}>
              <span className="text-sm font-medium">
                {chat.id || "Greeting"}
              </span>
              <span className="text-xs text-gray-500">
                {chat.updatedAt || "5 hours ago"}
              </span>
            </div>
          ))}
        </div>
      ),
    },
  ];
  const navigate = useNavigate();
  const [agent, setAgent] = useState<Agent>();
  const params = useParams();
  const agentId = params.agentId;
  useEffect(() => {
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
    const fetchChatDetails = async () => {
      const url =
        process.env.REACT_APP_API_URL + `/api/v1/chat/agent/${agentId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setChatList(data.data);
        // navigate(`./${data.data[0].id}`); // if you want to navigate to first chat
      }
    };
    fetchAgentDetails();
    fetchChatDetails();
  }, []);
  return (
    <div className="p-4 bg-white w-96 shadow-md rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <Button onClick={() => navigate(-1)}>
          <ArrowLeftOutlined />
        </Button>
        <Space>
          <Avatar size="small" src="https://via.placeholder.com/32" />
          <span className="text-sm font-medium">{agent?.name}</span>
        </Space>
        <Space>
          <FilterOutlined />
          <SearchOutlined />
          <PlusOutlined  onClick={()=>navigate(`./new`)}className="border rounded-md p-1"/>
        </Space>
      </div>

      {/* Tabs */}
      <Tabs
        defaultActiveKey="2"
        items={items}
        tabBarGutter={16}
        tabBarStyle={{ fontSize: "14px" }}
      />
    </div>
  );
};

export default TasksPanel;
