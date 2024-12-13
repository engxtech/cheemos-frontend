import { BrowserRouter, Route, Routes } from "react-router-dom";
import AgentsDashboard from "../pages/agents/AllAgents";
import { CreateAgent } from "../pages/agents/CreateAgent";
import InitialChatPage from "../pages/InitialChatPage";
import ToolSettings from "../pages/agents/AddToolAgent";

export default function AgentContent() {
   return(
          <Routes>
            <Route path="/" element={<AgentsDashboard />} />
            <Route path="/tools/*" element={<ToolSettings />} />
            {/* <Route path="/*" element={<CreateAgent />} /> */}
            <Route path="/:id/*" element={<InitialChatPage />} />
          </Routes>
   )
}