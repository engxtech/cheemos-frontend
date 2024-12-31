import React, { useState } from "react";
import { Input, Button, message } from "antd";
import { SendOutlined } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

const NewChat: React.FC = () => {
  const [prompts, setPrompts] = useState("");

  const navigate = useNavigate();
  const agentId = useParams().agentId;
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
        <div className="p-4 rounded-lg flex flex-col md:flex-row items-center">
          <Input
            className="border w-full md:flex-grow mb-4 md:mb-0"
            placeholder="Message ChatGPT"
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 w-full">
          <Button className="hover:bg-gray-600">Create image</Button>
          <Button className="hover:bg-gray-600">Summarize text</Button>
          <Button className="hover:bg-gray-600">Code</Button>
          <Button className="hover:bg-gray-600">Get advice</Button>
          <Button className="hover:bg-gray-600">Help me write</Button>
          <Button className="hover:bg-gray-600 w-full">More</Button>
        </div>
      </div>
    </div>
  );
};

export default NewChat;
