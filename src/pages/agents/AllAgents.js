import React, { useState, useEffect } from "react";
import {
  Layout,
  Card,
  Button,
  Drawer,
  Skeleton,
  message,
  Avatar,
  Tooltip,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Sidebar from "../sider/SiderMainPage";
import { AgentHeader } from "../../header/AgentHeader";
import { useNavigate } from "react-router-dom";
import image1 from "../../assets/Aatar.png";
import image2 from "../../assets/Aatar(1).png";
import image3 from "../../assets/Aatar(2).png";
import image4 from "../../assets/Aatar(3).png";
import image5 from "../../assets/Aatar(4).png";
import {
  CopyAllOutlined,
  DeleteOutlined,
  EditOutlined,
  InfoOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setCreateAgent, setEditing } from "../../redux/agents/action";
import Meta from "antd/es/card/Meta";
import EmptyContent from "../../components/zeroContent";
import AgentInProgressModal from "../../utils/AgentCreationInProgress";

const { Sider, Content } = Layout;

//agent type required
const AgentsDashboard = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createAgent = useSelector((state) => state.agent);
  const [loadingEdit,setLoadingEdit] =useState(false)
  useEffect(() => {
    setLoading(true);
    const getAgents = async () => {
      const url = process.env.REACT_APP_API_URL + "/api/v1/user/agents";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setAgents(data.data.content);
      setLoading(false);
    };
    getAgents();
  }, [refresh]);

  const handleDelete = async (id) => {
    const url = process.env.REACT_APP_API_URL + `/api/v1/agent/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (response.ok) {
      setRefresh(!refresh);
    }
  };
  const editAgent = async(agent1) => {
    setLoadingEdit(true);
    const url = process.env.REACT_APP_API_URL + `/api/v1/agent/${agent1.id}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      const agent =data.data;
      const ids = agent.toolsList.map(tool => tool.id);
    // call that api and set the value then!
    dispatch(setEditing(true));
    dispatch(
      setCreateAgent({
        ...createAgent,
        name: agent.name,
        id: agent.id,
        iconName: agent.iconName,
        customProperties: agent.customProperties,
        toolsList: ids,
        toolsListCore:agent.toolsList,
        description: agent.description,
        welcomeMessage:agent.welcomeMessage,
        agentGuideText:agent.agentGuideText,
        temperature:agent.temperature,
        coreInstructions: {
          _SYSTEM_CORE_INSTRUCTIONS_PROMPT:
            agent.coreInstructions?._SYSTEM_CORE_INSTRUCTIONS_PROMPT?.content,
        },
        knowledgeList:agent.knowledgeList,
        toolRetries: 3,
        slackBotId:agent.slackBotId,
        jiraUrl:agent.jiraUrl,
        githubUrl:agent.githubUrl
      })
    );
    setLoadingEdit(false);
    navigate("/agents/create-agent");
  };
  const images = [image1, image2, image3, image4, image5];

  function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }
  if (loadingEdit){
    return <AgentInProgressModal text="loading to edit"/>
  }
  if (loading ) {
    return (
      <div className="mb-10 fixed top-0 left-0 right-0 z-10">
        <AgentHeader />
        <div className="grid sm:grid-cols-4 grid-cols-1 gap-4 px-6 py-4 mt-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card
              key={index}
              className="sm:w-[23vw] w-[90vw] h-50 bg-gray-900"
              hoverable
            >
              <Skeleton
                avatar
                paragraph={{ rows: 5 }}
                active
                title={false}
                className="h-full"
              />
            </Card>
          ))}
        </div>
      </div>
    );
  }
  const detailedInfo = (card) => (
    <div className="bg-gray-900 text-gray-200 p-1 rounded-md text-xs shadow-lg">
      <p>tools:+ 4</p>
      <p className="space-x-2">Version: {card.version}</p>
      <p>Last Updated: 29 May</p>
      {/* Add more details as needed */}
    </div>
  );

  if (agents.length === 0) {
    return (
      <div className="bg-black h-screen fixed top-0 left-0 right-0 z-10">
        <AgentHeader />
        <EmptyContent message="No Agent Found" />
      </div>
    );
  }


  return (
    <Layout className="h-screen fixed top-0 left-0 right-0 z-10">
      <AgentHeader />
      <Content className="bg-black flex-1 overflow-y-auto p-4">
        <div className="grid sm:grid-cols-4 grid-cols-1  gap-4 mt-2 overflow-auto scroll ">
          {agents.map((agent, index) => (
            <Card
              key={agent.id}
              hoverable
              className={` sm:w-[21vw]w-[100vw] h-50 bg-gray-900 `}
              actions={[]}
            >
              <Meta
                avatar={<Avatar src={getRandomImage()} size={75} />}
                title={
                  <span className="text-gray-300 flex justify-between">
                    {agent.name}
                    <Tooltip
                      title={detailedInfo(agent)}
                      overlayClassName="custom-tooltip"
                    >
                      <InfoOutlined className="ml-2 cursor-pointer text-gray-400 hover:text-gray-200" />
                    </Tooltip>
                  </span>
                }
                description={
                  <div className="h-[10vh] text-gray-300">
                    {agent.description.length > 50
                      ? `${agent.description.substring(0, 50)}...`
                      : agent.description}
                  </div>
                }
              />
              <hr></hr>
              <div className="rounded-lg p-2 flex justify-between items-center">
                <div className="space-x-1">
                  <Button
                    key="delete"
                    className="px-1 py-1"
                    onClick={() => handleDelete(agent.id)}
                  >
                    <DeleteOutlined />
                  </Button>
                  <Button
                    key="copy"
                    onClick={() =>
                      message.info("This feature to copy will be enabled soon!")
                    }
                    className="px-1 py-1"
                  >
                    <CopyAllOutlined />
                  </Button>
                </div>

                <div className="space-x-1 flex items-center">
                  <Button key="edit" onClick={() => editAgent(agent)} icon={<EditOutlined/>}>
                    
                  </Button>
                  <Button
                    type="primary"
                    key="use"
                    onClick={() => navigate(`./${agent.id}/new`)}
                  >
                    Use {">"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Content>
    </Layout>
  );
};

export default AgentsDashboard;
