import { BrowserRouter, Route, Routes } from "react-router-dom";
import AgentsDashboard from "../pages/agents/AllAgents";
import { CreateAgent } from "../pages/agents/CreateAgent";
import InitialChatPage from "../pages/InitialChatPage";
import InitialChatPage2 from "../pages/InitialChatPage2";
import ToolSettings from "../pages/agents/AddToolAgent";

export default function AgentContent() {
   return(
          <Routes>
            {/* <Route path="/tools/*" element={<ToolSettings />} /> */}
            <Route path="/new" element={<InitialChatPage />} />
            <Route path="/:chatId" element={<InitialChatPage2 />} />
          </Routes>
   )
}