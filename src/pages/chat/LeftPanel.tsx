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
import image1 from "../../assets/Aatar.png";

interface TasksPanelProps {
  setActivePanel: (panel: string) => void;
}


const TasksPanel: React.FC<TasksPanelProps> = ({ setActivePanel }) => {
  const [chatList, setChatList] = useState<ChatList[]>([]);
  const skeletonArray = Array(5).fill(null); 
  const [isLoading,setLoading]=useState(false)
  const darkMode = localStorage.getItem("darkmode") === "true";
  const items = [
    // {
    //   key: "1",
    //   label: <span className="text-sm font-medium">To Review</span>,
    //   children: (
    //     <div className="text-center text-gray-400">No tasks to review.</div>
    //   ),
    // },
    {
      key: "2",
      label: (
        <span className="text-sm font-medium">
          All Chats 
          {/* <Badge count={1} /> */}
        </span>
      ),

      children: (
        <div className={`mt-2 space-y-2 ${darkMode?"text-gray-300":""}`}>
          {/* <div className="text-gray-500 text-xs mb-1">Today</div> */}
          {isLoading
        ? skeletonArray.map((_, index) => (
            <div
              key={index}
              className="flex sm:w-full w-[40vh] justify-between items-center px-6 py-4 space-x-10 bg-gray-100 rounded-lg animate-pulse"
            >
              <div className="h-4 sm:w-20 w-40 bg-gray-300 rounded"></div>
              <div className="h-3 sm:w-14 w-30 bg-gray-300 rounded"></div>
            </div>
          ))
        : chatList.map((chat) => (
            <div
              key={chat.id}
              className="flex sm:w-full w-[40vh] justify-between hover:bg-gray-200 hover:cursor-pointer items-center px-3 py-2 space-x-8 bg-gray-100 rounded-lg"
              onClick={() => {
                navigate(`../${chat.id}`)
                setActivePanel("chats");
              }}
            >
              <span className="text-sm p-2 font-medium">
                {chat.id || "Greeting"}
              </span>
              {/* <span className="text-xs text-gray-500">
                {chat.updatedAt || "5 hours ago"}
              </span> */}
            </div>
          ))}
          {/* {chatList.map((chat) => (
            <div className="flex justify-between hover:bg-gray-200 hover:cursor-pointer items-center px-3 py-2 space-x-8 bg-gray-100 rounded-lg" onClick={()=>navigate(`../${chat.id}`)}>
              <span className="text-sm font-medium">
                {chat.id || "Greeting"}
              </span>
              <span className="text-xs text-gray-500">
                {chat.updatedAt || "5 hours ago"}
              </span>
            </div>
          ))} */}
        </div>
      ),
    },
  ];

  const navigate = useNavigate();
  const [agent, setAgent] = useState<Agent>();
  const params = useParams();
  const agentId = params.agentId;
  useEffect(() => {
    setLoading(true)
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
        setChatList(data.data.content);
        // navigate(`./${data.data[0].id}`); // if you want to navigate to first chat
      }
      setLoading(false)
    };
    fetchAgentDetails();
    fetchChatDetails();
  }, []);
  return (
    <div className={`p-4  w-100 h-[90vh]  sm:h-[100vh] ${darkMode?"bg-gray-900":"bg-white sm:border"}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate('/agents')}  className="text-lg">
          <ArrowLeftOutlined />
        </button>
        <Space>
          <Avatar  src={image1} />
          <span className="text-sm font-medium">{agent?.name}</span>
        </Space>
        <Space className="space-x-3 text-lg">
          <FilterOutlined className="border rounded-md p-1" />
          <SearchOutlined  className="border rounded-md p-1" />
          <PlusOutlined  onClick={()=>navigate(`/agents/${agentId}/new`)}className="border rounded-md p-1"/>
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
