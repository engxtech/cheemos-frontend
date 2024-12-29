import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import AgentProfile from "./components/AgentProfile";
import AdvancedSettings from "../AdvancedSettings";
import SubAgentUI from "../SubAgent";
import ToolSettingsAgent from "../ToolSettings";
import ConfigureTemplateSettings from "../ConfigureTemplateSettings";
import CoreInstructions from "../CoreInstructions";
import ReactFlow from "../../../reactFlow/reactFlow";
import { useState } from "react";

const { Sider, Content } = Layout;

// Main Page Layout
export const CreateAgent = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false); // To manage sidebar state in mobile view

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  return (
    <Layout className="h-screen p-4  bg-gray-50 rounded-md">
      <Sidebar setSidebarVisible={setSidebarVisible}/>
      <Routes>
        <Route path="/" element={sidebarVisible ? null : <AgentProfile />} />
        <Route
          path="/profile"
          element={sidebarVisible ? null : <AgentProfile />}
        />
        <Route
          path="/settings"
          element={sidebarVisible ? null : <AdvancedSettings />}
        />
        <Route
          path="/tools"
          element={sidebarVisible ? null : <ToolSettingsAgent />}
        />
        <Route
          path="/configure-templates"
          element={sidebarVisible ? null : <ConfigureTemplateSettings />}
        />
        <Route
          path="/instructions"
          element={sidebarVisible ? null : <CoreInstructions />}
        />
        <Route
          path="/subagents"
          element={sidebarVisible ? null : <SubAgentUI />}
        />
        <Route path="/flow" element={sidebarVisible ? null : <ReactFlow />} />
      </Routes>
    </Layout>
  );
};
