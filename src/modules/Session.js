import React, { useEffect, useState } from "react";
import { styled } from "@mui/joy/styles";
import Bubble from "../interface/Bubble";
import Banner from "../interface/Banner";
import Sequence from "../interface/Step";
import ScrollToBottom from "react-scroll-to-bottom";
import { useParams } from "react-router-dom";
import io from 'socket.io-client';
import { message } from "antd";

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
const url = "ws://api-p-sirius.aqumenlabs.ai:8080/chat?" + "token="+localStorage.getItem('token')+"&chatId="+chatId; 
const [refresh,setRefresh]=useState(false)
useEffect(() => {
  const socket = new WebSocket(url);

  socket.onmessage = (event) => {
    const data = event.data;
    message.success("Connected and received data: " + data);
    loadChat()
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
      setChats(data.data.content);
    }
  };
  useEffect(() => {
    
    loadChat();
  }, [chatId,refresh]);

  return (
    <div className="h-[78vh] border bg-gray-50 p-1 overflow-y-auto rounded-md">
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
          return <div className="border">{chat.content}</div>;
        })}
      </Division>
    </div>
  );
}

export default Session;
