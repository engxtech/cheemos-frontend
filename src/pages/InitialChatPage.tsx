import React from "react";
import Session from "../modules/Session";
import InputPanel from "../modules/InputPanel";
import PropertiesPanel from "./chat/Properties";
import TasksPanel from "./chat/LeftPanel";
import NewChat from "../modules/NewChat";
import { Route, Routes, useParams } from "react-router-dom";

export default function InitialChatPage() {
  const [sessionList, setSessionList] = React.useState([]);
  return (
    <div className="h-full w-full">
      <div className="flex justify-between w-full">
        <TasksPanel />
        <div className="w-[52vw]">
          <NewChat />
          {/* <InputPanel
            sessionList={sessionList}
            setSessionList={setSessionList}
          /> */}
        </div>
        <PropertiesPanel />
      </div>
    </div>
  );
}
