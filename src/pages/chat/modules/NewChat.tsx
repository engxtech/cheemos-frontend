import React, { useEffect, useState } from "react";
import { Input, Button, message } from "antd";
import { SendOutlined } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { DynamicBoxGrid } from "./components/WelcomeGuide";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { setCreateAgent } from "../../../redux/agents/action";

const NewChat: React.FC = () => {
  const [prompts, setPrompts] = useState("");
  const dispatch = useDispatch();
  const agentId = useParams().agentId;
  const createAgent = useSelector((state: RootState) => state.agents.agent);
  useEffect(() => {
    const loadData = async () => {
      const url = process.env.REACT_APP_API_URL + `/api/v1/agent/${agentId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      const agent = data.data;
      const ids = agent.toolsList.map((tool) => tool.id);

      dispatch(
        setCreateAgent({
          ...createAgent,
          name: agent.name,
          id: agent.id,
          iconName: agent.iconName,
          customProperties: agent.customProperties,
          toolsList: ids,
          toolsListCore: agent.toolsList,
          description: agent.description,
          welcomeMessage: agent.welcomeMessage,
          agentGuideText: agent.agentGuideText,
          temperature: agent.temperature,
          // coreInstructions: {
          //   _SYSTEM_CORE_INSTRUCTIONS_PROMPT:
          //     agent.coreInstructions._SYSTEM_CORE_INSTRUCTIONS_PROMPT.content,
          // },
          toolRetries: 3,
        })
      );
     
    };
    loadData()
  },[]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const handleFirstSend = async () => {
    setLoading(true);
    const url = process.env.REACT_APP_API_URL + `/api/v1/chat/new`;
    const payload = {
      agentId: agentId,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      const data = await response.json();
      const url = process.env.REACT_APP_API_URL + `/api/v1/chat/sendMessage`;
      const payload = {
        role: "user",
        content: prompts,
        chatId: data.data,
      };
      const response1 = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // If you want to send an empty body, this is fine
      });
      if (response1.ok) {
        setPrompts("");
        setLoading(false);
        navigate(`../${data.data}`);
        message.success("Loaded Response , fetch from backend now!");
      } else {
        // this needs to be corrected!
        const response1 = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload), // If you want to send an empty body, this is fine
        });
        setPrompts("");
        setLoading(false);
        navigate(`../${data.data}`);
      }
    }
  };
  return (
    <div className="h-[100vh] bg-gray-50 px-16  overflow-y-auto rounded-md flex flex-col justify-center items-center">
      <div className="w-full space-y-6">
        <h1 className="text-xl md:text-2xl font-bold text-center">
          What can I help with?
        </h1>

        <DynamicBoxGrid data={createAgent.welcomeMessage} title="Welcome Message" />
        <DynamicBoxGrid data={createAgent.agentGuideText}title="Agent Guide Text"  />
        <div className="p-4 rounded-lg flex flex-col md:flex-row items-center">
          <Input
            className="border w-full md:flex-grow mb-4 md:mb-0"
            placeholder="Message ViktonAi"
            onChange={(e) => setPrompts(e.target.value)}
          />
          <Button
            type="text"
            className="ml-0 md:ml-2 border hover:bg-gray-600"
            onClick={() => handleFirstSend()}
            loading={loading}
            disabled={loading || prompts === ""}
            icon={
              <span className="material-icons border text-white bg-gray-200 rounded-md p-1 ml-1">
                <SendOutlined />
              </span>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default NewChat;
