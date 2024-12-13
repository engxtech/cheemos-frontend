// Sidebar Component
import { Layout, Menu, Avatar, Input, Button, Divider } from "antd";
import { InboxOutlined, SettingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
export const Sidebar = () => {
  const navigate = useNavigate();
  const CreateAgent =useSelector((State:RootState)=>State.agents.agent)
  const handleSave=async()=>{
    const url ="http://localhost:8080/api/v1/agent/new"
    const response = await fetch(url,{
      method:'POST',
      headers:{
        Authorization:"Bearer "+ localStorage.getItem('token'),
        "Content-Type":"application/json"
      },
      body:JSON.stringify(CreateAgent)
    })
    if(response.ok){
      navigate("/")
    }
  }
  return (
    <Sider
      width={245}
      className="bg-gray-100 border-r border-gray-200"
      breakpoint="lg"
      collapsedWidth="0"
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        className="h-[96vh]  shadow-md  border py-10 bg-gray-100 text-[0.9rem]"
      >
        <Menu.Item key="1" icon={<InboxOutlined />} onClick={()=>navigate("./profile")} >
          Agent profile
        </Menu.Item>
        <span className="text-[0.8rem] p-4 text-gray-500 block">Agent instructions</span>
        <Menu.Item key="2" icon={<SettingOutlined />} onClick={()=>navigate("./instructions")}>
           Instructions
        </Menu.Item>
        <Menu.Item key="3" icon={<SettingOutlined />} onClick={()=>navigate("./flow")}>
          Flow builder
        </Menu.Item>
        <span className="text-[0.8rem] p-4  text-gray-500 block">Agent Settings</span>
        <Menu.Item key="4" icon={<SettingOutlined /> } className="" onClick={()=>navigate("./settings")}>
          Advanced settings
        </Menu.Item>
        <Menu.Item key="5" icon={<SettingOutlined />} onClick={()=>navigate("./tools")}>
          Tools
        </Menu.Item>
        <Menu.Item key="7" icon={<SettingOutlined />} onClick={()=>navigate("./subagents")}>
          SubAgents
        </Menu.Item>
        <span className="text-[0.8rem] p-4 text-gray-500 block">More Info</span>
        <Menu.Item key="6" icon={<SettingOutlined />} onClick={()=>navigate('./configure-templates')}>
          Abilities
        </Menu.Item>
       
        <div className="flex space-x-3 mt-2 ml-6 mt-6">
        <Button
          type="text"
          className="mt-2 ml-2 text-gray-600"
          onClick={()=>navigate("/")}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          className="mt-2 ml-2"
          onClick={() => handleSave()}
        >
          Save
        </Button>
      </div>
      </Menu>
    
    </Sider>
  );
};
