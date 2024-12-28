import { useState } from "react";
import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import AgentProfile from "../AgentProfile";
import AdvancedSettings from "../AdvancedSettings";
import SubAgentUI from "../SubAgent";
import ToolSettingsAgent from "../ToolSettings";
import ConfigureTemplateSettings from "../ConfigureTemplateSettings";
import CoreInstructions from "../CoreInstructions";
import ReactFlow from "../../../reactFlow/reactFlow";

const { Sider, Content } = Layout;

// Main Page Layout
export const CreateAgent = () => {

  return (
    <Layout className="h-screen p-4  bg-gray-50 rounded-md">
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
