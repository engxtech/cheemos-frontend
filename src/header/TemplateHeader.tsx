import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, Drawer, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  AddOutlined,
  CopyAllOutlined,
  DeleteOutlined,
  FileUpload,
  UploadFileOutlined,
  UploadRounded,
  UploadSharp,
  VerifiedUserOutlined,
} from "@mui/icons-material";
import Sidebar from "../pages/sider/SiderMainPage";
import { Agent } from "../redux/agents/store";

export const TemplateHeader = () => {
  const [visible, setVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
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
    };
    getAgents();
  }, []);
const publishAgent=async(id)=>{
  const url =process.env.REACT_APP_API_URL +`/api/v1/template/create`
  const payload={
     agentId:id,
     releaseType:"MINOR"
  }
  const response =await fetch(url,{
    method:'POST',
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type":"application/json"
    },
    body:JSON.stringify(payload)
  })
  if(response.ok){
    message.success("Template created successfully")
  }
}
  return (
    <div className="flex justify-between items-center p-5 border">
      <div className="flex items-center space-x-4">
        <Button
          type="text"
          icon={<div className="text-3xl">≡</div>}
          onClick={() => setVisible(true)} // Hamburger Icon (or any other)
        />
        <h2 className="text-2xl font-semibold">Market Place</h2>
      </div>
      <Sidebar visible={visible} setVisible={setVisible} />
      <div className="flex space-x-4 ">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setDrawerVisible(true)}
        >
         Publish Agent
        </Button>
        <Button type="text">
          <div className="text-2xl">⚙️</div> {/* Settings Icon */}
        </Button>
        <Drawer
          title="Publish Your Agent"
          placement="right"
          width={400}
          onClose={() => setDrawerVisible(false)}
          visible={drawerVisible}
        >
          {agents.map((agent, index) => (
            <Card
              key={agent.id}
              title={
                <p className="flex items-center space-x-2">
                  <Avatar
                    icon={<VerifiedUserOutlined />}
                    className="p-1"
                    alt="avatar"
                  />{" "}
                  <p>{agent.name}</p>
                </p>
              }
              className="shadow-md border bg-gray-50 rounded-lg mt-2"
              actions={[
                <Button key="add" type="primary" onClick={()=>publishAgent(agent.id)}>
                  <AddOutlined className="text-white border bg-white rounded-full" />
                  Publish as Template
                </Button>,
              ]}
            >
              <p>{agent.description}</p>
            </Card>
          ))}
        </Drawer>
      </div>
    </div>
  );
};
