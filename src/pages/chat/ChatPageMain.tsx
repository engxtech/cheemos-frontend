import React, { useState } from "react";
import Session from "./modules/Session";
import InputPanel from "./modules/InputPanel";
import PropertiesPanel from "./Properties";
import TasksPanel from "./LeftPanel";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Button } from "antd";
import { CloseOutlined } from "@mui/icons-material";


export default function InitialChatPage2() {
  const [sessionList, setSessionList] = React.useState([]);
  const [activePanel, setActivePanel] = useState('chats'); // Default to 'chats'

  // Toggle the panel visibility for mobile view
  const togglePanel = (panel: string) => {
    setActivePanel(panel);
  };
  const [refresh, setRefresh] = useState(false);

const navigate =useNavigate();
  return (
    <div className="h-full w-full text-sm">
      {/* Button to toggle visibility on mobile */}
      <div className="flex justify-between sm:hidden p-1 px-4 bg-gray-900 text-white  mb-4">
        <div>

   
        <button
          onClick={() => togglePanel('chats')}
          className={`mr-2 p-1 px-4  rounded-md ${activePanel === 'chats' ? 'bg-gray-800' : ''}`}
        >
          Chats
        </button>
        <button
          onClick={() => togglePanel('tasks')}
          className={`mr-2 p-1 px-4 rounded-md ${activePanel === 'tasks' ? 'bg-gray-800' : ''}`}
        >
          Tasks
        </button>
        <button
          onClick={() => togglePanel('properties')}
          className={`${activePanel === 'properties' ? 'bg-gray-800' : ''} p-1 px-4 rounded-md`}
        >
          Properties
        </button>
        </div>
        <Button type="text" onClick={()=>navigate('/agents')} className="border" icon={<CloseOutlined />}>
        </Button>
      </div>

      <div className="flex justify-between w-full">
        {/* Tasks Panel - Hidden on mobile and toggled on click */}
        <div
          className={`sm:block sm:w-1/4 w-full ${activePanel === 'tasks' ? 'block' : 'hidden'}`}
        >
          <TasksPanel setActivePanel={setActivePanel}/>
        </div>

        {/* Main content area */}
        <div className="w-full sm:w-[52vw]">
          {activePanel === 'chats' && (
            <Session sessionList={sessionList} setSessionList={setSessionList} refresh={refresh} setRefresh={setRefresh} />
          )}
          {activePanel === 'chats' && (
            <InputPanel
              sessionList={sessionList}
              setSessionList={setSessionList}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          )}
        </div>

        {/* Properties Panel - Hidden on mobile and toggled on click */}
        <div
          className={`sm:block ${activePanel === 'properties' ? 'block' : 'hidden'}`}
        >
          <PropertiesPanel />
        </div>
      </div>
    </div>
  );
}
