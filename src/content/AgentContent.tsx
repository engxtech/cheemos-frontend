import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateAgent } from "../pages/agents/createAgent/CreateAgent";
import InitialChatPage2 from "../pages/chat/ChatPageMain";
import InitialChatPage from "../pages/chat/NewChat";

export default function AgentContent() {
   return(
          <Routes>
            {/* <Route path="/tools/*" element={<ToolSettings />} /> */}
            <Route path="/new" element={<InitialChatPage />} />
            <Route path="/:chatId" element={<InitialChatPage2 />} />
          </Routes>
   )
}