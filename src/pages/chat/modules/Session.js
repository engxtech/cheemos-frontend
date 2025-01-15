import { useEffect, useState } from "react";
import { styled } from "@mui/joy/styles";
import ScrollToBottom from "react-scroll-to-bottom";
import { useParams } from "react-router-dom";
import { Button, Spin } from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CancelOutlined, ErrorOutlineRounded } from "@mui/icons-material";

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
  const { refresh, setRefresh } = props;
  const [popupErrorVisible,setPopupErrorVisible]=useState(false)
  const [error,setError]=useState('')
  const chatId = useParams().chatId;
  //integrate socket
  const url =
    "ws://api-p-sirius.aqumenlabs.a:8080/chat?" +
    "token=" +
    localStorage.getItem("token") +
    "&chatId=" +
    chatId;

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onmessage = (event) => {
      const data = event.data;
      if(data!="OK"){
        setPopupErrorVisible(true)
        setError(data)
      }
      console.log("Connected and received data: " + data);
      setRefresh(false);
      refreshChat();
    };
    
    socket.onopen = () => {
      console.log("Connected to the server");
    };

    socket.onerror = (error) => {
      // message.error("WebSocket Error: " + error.message);
    };

    socket.onclose = (event) => {
      // if (event.wasClean) {
      //   message.info("Connection closed cleanly");
      // } else {
      //   message.error("Connection closed unexpectedly");
      // }
    };

    return () => {
      socket.close();
    };
  }, []);

  const [chats, setChats] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [maxPage, setMaxPage] = useState(0);
  const loadChat = async () => {
    setLoading(true);
    setPage(0);
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
      setChats(data.data.content.reverse());
    }
    setLoading(false);
  };

  const refreshChat = async () => {
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
      setPage(0);
      setMaxPage(data.data.page.totalPages);
      setChats(data.data.content.reverse());
    }
  };
  const loadMoreChat = async () => {
    setLoadingMore(true);
    const url =
      process.env.REACT_APP_API_URL +
      `/api/v1/chat/${chatId}/messages?page=${page+1}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (response.ok) {
      const data = await response.json();
      setChats([...data.data.content.reverse(),...chats]);
      setPage(page + 1);
    }
    setLoadingMore(false);
  }

  useEffect(() => {
    refreshChat();
  }, [refresh]);

  useEffect(() => {
    loadChat();
  }, [chatId]);

  const darkMode = localStorage.getItem("darkmode") === "true";
  if (loading) {
    return (
      <div
        className={`sm:h-[78vh] h-[75vh] p-3  flex items-center justify-center overflow-y-auto rounded-md space-y-2 ${
          darkMode ? "text-gray-200 bg-white" : "text-gray-600  bg-white"
        }`}
      >
        <Spin className="mr-2" />
        Loading...
      </div>
    );
  }
  return (
    <div
      className={`sm:h-[78vh] h-[75vh] p-3 overflow-y-auto rounded-md space-y-2 ${
        darkMode ? "text-gray-200 bg-white" : "text-gray-600  bg-white"
      }`}
    >
      
      {maxPage>page+1 && <Button type="primary" onClick={loadMoreChat}>{loadingMore ? "Loading... ": "Load More"}</Button>}
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
                  ? darkMode
                    ? "bg-gray-800 text-gray-300 self-start p-3"
                    : " bg-blue-50 text-blue-900 self-start p-3"
                  : darkMode
                  ? "bg-blue-600 text-gray-200 self-end"
                  : "bg-gray-100 text-green-900 self-end"
              }
              `}
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
              <span
                className={`text-xs ${
                  darkMode ? "text-gray-400" : "text-gray-500 "
                }`}
              >
               {new Date(new Date(chat.createdAt).getTime() + 5.5 * 60 * 60 * 1000).toLocaleTimeString('en-IN')}
              </span>
            </div>
          );
        })}
      </Division>
      {popupErrorVisible  && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              
              <div className="flex items-center space-x-3">
                <ErrorOutlineRounded className="h-6 w-6" />
                <h2 className="text-sm  text-red-400">
                 Error Occured
                </h2>
              </div>
              <div>
                <CancelOutlined onClick={()=>setPopupErrorVisible(false)}/>
              </div>
            </div>
           {error}
          </div>
        </div>
      )}
    </div>
  );
}

export default Session;
