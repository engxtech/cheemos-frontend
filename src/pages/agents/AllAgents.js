import React, { useState, useEffect } from "react";
import { Layout, Card, Button, Drawer, Skeleton, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Sidebar from "../sider/SiderMainPage";
import { AgentHeader } from "../../header/AgentHeader";
import { useNavigate } from "react-router-dom";
import image1 from "../../assets/Aatar.png";
import image2 from "../../assets/Aatar(1).png";
import image3 from "../../assets/Aatar(2).png";
import image4 from "../../assets/Aatar(3).png";
import image5 from "../../assets/Aatar(4).png";
import { CopyAllOutlined, DeleteOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setCreateAgent, setEditing } from "../../redux/agents/action";

const { Sider, Content } = Layout;

//agent type required
const AgentsDashboard = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const dispatch =useDispatch()
  const createAgent =useSelector((state)=>state.agent)

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
      setAgents(data.data);
      setLoading(false);
    };
    getAgents();
  }, [refresh]);
  const navigate = useNavigate();
  if (loading) {
    return (
      <div className="mb-10">
        <AgentHeader/>
        <div className="grid sm:grid-cols-4 grid-cols-1 gap-4 px-6 py-4 mt-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card
              key={index}
              className="sm:w-[23vw] w-[100vw] h-50 bg-gray-900"
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
  const editAgent=(agent)=>{
    dispatch(setEditing(true));
    dispatch(
      setCreateAgent({
        ...createAgent,
        name:agent.name,
        id:agent.id,
        description:agent.description,
        coreInstructions: {
          _SYSTEM_CORE_INSTRUCTIONS_PROMPT: agent.coreInstructions._SYSTEM_CORE_INSTRUCTIONS_PROMPT.content,
        },
        toolRetries:3
      })
    );
    navigate('/agents/create-agent')
  }

  return (
    <Layout className="h-screen bg-gray-200">
      {/* <Sidebar visible={siderVisible} setVisible={setSiderVisible} /> */}
      <AgentHeader />
      <Content className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent, index) => (
            <Card
              key={agent.id}
              title={
                <p className="flex items-center space-x-2">
                  <img src={image1} alt="avatar" className="p-1"></img>
                  <p>{agent.name}</p>
                </p>
              }
              className="shadow-md border rounded-lg"
              actions={[
              ]}
            >
              <p>{agent.description}</p>
              <hr>
              </hr>
              <div className="flex space-x-4 mt-4 px-4 justify-between">
                  <div className="space-x-2 px-2">
                    <Button key="delete" onClick={() => handleDelete(agent.id)}>
                      <DeleteOutlined />
                    </Button>
                    <Button
                      key="copy"
                      onClick={() =>
                        message.info(
                          "This feature to copy will be enabled soon!"
                        )
                      }
                    >
                      <CopyAllOutlined />
                    </Button>
                  </div>

                  <div className="space-x-2 px-2">
                    <Button key="edit" onClick={()=>editAgent(agent)}>Edit</Button>
                    <Button
                      type="primary"
                      key="use"
                      onClick={() => navigate(`./${agent.id}/new`)}
                    >
                      Use Agent {">"}
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
