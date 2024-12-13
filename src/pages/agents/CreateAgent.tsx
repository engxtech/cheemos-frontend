import React, { useState } from "react";
import { Layout, Menu, Avatar, Input, Button, Divider } from "antd";
import { InboxOutlined, SettingOutlined } from "@ant-design/icons";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { ChatBubble } from "@mui/icons-material";
import AgentProfile from "./AgentProfile";
import AdvancedSettings from "./AdvancedSettings";
import ToolSettings from "./AddToolAgent";
import SubAgentUI from "./SubAgent";
import ToolSettingsAgent from "./ToolSettings";
import ConfigureTemplateSettings from "./ConfigureTemplateSettings";
import CoreInstructions from "./CoreInstructions";
import { RootState } from "../../redux";
import { useSelector } from "react-redux";
import ReactFlow from "../../reactFlow/reactFlow";

const { Sider, Content } = Layout;

// Main Page Layout
export const CreateAgent = () => {
  const [visible, setVisible] = useState(true);

  return (
    <Layout className="h-screen p-4 border bg-gray-50 shadow-md rounded-lg">
      <Sidebar />
      <Routes>
        <Route path="/" element={<AgentProfile />}></Route>
        <Route path="/profile" element={<AgentProfile />}></Route>
        <Route path="/settings" element={<AdvancedSettings />} />
        <Route path="/tools" element={<ToolSettingsAgent />} />
        <Route path="/configure-templates" element={<ConfigureTemplateSettings />} />
        <Route path="/instructions" element={<CoreInstructions />} />
        <Route path="/subagents" element={<SubAgentUI />} />
        <Route path="/flow" element={<ReactFlow />} />
      </Routes>
    </Layout>
  );
};
