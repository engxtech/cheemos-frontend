import React, { useEffect, useState } from "react";
import { styled } from "@mui/joy/styles";
import Bubble from "../interface/Bubble";
import Banner from "../interface/Banner";
import Sequence from "../interface/Step";
import ScrollToBottom from "react-scroll-to-bottom";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { message } from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useSelector } from "react-redux";

const Division = styled(ScrollToBottom)(({ theme }) => ({
  overflow: "auto",
  paddingBottom: theme.spacing(1),
  flexGrow: 1,
  "& >div": {
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden",
    "& > :first-of-type": {
      marginTop: "auto",
      paddingTop: theme.spacing(2),
    },
  },
}));

function Session(props) {
  const { sessionList } = props;
  const chatId = useParams().chatId;
  //integrate socket
  const url =
    "ws://api-p-sirius.aqumenlabs.ai:8080/chat?" +
    "token=" +
    localStorage.getItem("token") +
    "&chatId=" +
    chatId;
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onmessage = (event) => {
      const data = event.data;
      message.success("Connected and received data: " + data);
      loadChat();
      setRefresh(!refresh);
    };

    socket.onopen = () => {
      message.success("Connected to the server");
    };

    socket.onerror = (error) => {
      message.error("WebSocket Error: " + error.message);
    };

    socket.onclose = (event) => {
      if (event.wasClean) {
        message.info("Connection closed cleanly");
      } else {
        message.error("Connection closed unexpectedly");
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  console.log({ props });

  const [chats, setChats] = useState([]);

  const loadChat = async () => {
    const url =
      process.env.REACT_APP_API_URL + `/api/v1/chat/${chatId}/messages`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (response.ok) {
      const data = await response.json();
      setChats(data.data.content.reverse().slice(1));
    }
  };
  const refresh1 =useSelector((state)=>state.refresh)
  useEffect(() => {
    loadChat();
  }, [chatId, refresh,refresh1]);

  return (
    <div className="h-[78vh] p-3 overflow-y-auto rounded-md space-y-2">
      <Division>
        {/* {sessionList.map((item, index) =>
        item.type === "Bubble"
          ? <Bubble
            key={index}
            fromUser={item.fromUser}
            content={item.content.replaceAll(
              /<action>(.+?)<\/action>/g,
              "<code class='dialogue-cpu'>$1</code>"
            )}
            attached={item.attached}
          /> : item.type === "Banner"
          ? <Banner
            key={index}
            color={item.color}
            content={item.content}
          /> : item.type === "Step"
          ? <Sequence
            key={index}
            config={item.config}
          /> : null
      )} */}
        {chats.map((chat) => {
          const isCodeBlock = chat.content.includes("```");

          // Extract code and text parts (if code block exists)
          const formattedContent = isCodeBlock
            ? chat.content.split("```")
            : [chat.content];

          return (
            <div
              key={chat.id}
              className={`px-3 max-w-[80%] rounded-lg mb-2 ${
                chat.role === "system"
                  ? "bg-blue-50 text-blue-900 self-start p-3"
                  : "bg-gray-100 text-green-900 self-end"
              }`}
            >
              {formattedContent.map((block, index) =>
                block.trim().startsWith("java") ? (
                  <SyntaxHighlighter
                    key={index}
                    language="java"
                    style={materialLight}
                    className="rounded-md shadow-md mt-5"
                  >
                    {block.replace("java\n", "")}{" "}
                    {/* Remove language specifier */}
                  </SyntaxHighlighter>
                ) : (
                  <p key={index} className="text-sm mt-2">
                    {block}
                  </p>
                )
              )}
              <span className="text-xs text-gray-500">
                {new Date(chat.createdAt).toLocaleTimeString()}
              </span>
            </div>
          );
        })}
      </Division>
    </div>
  );
}

export default Session;
