import React, { useState } from "react";
import { Button, Drawer, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { FileUpload, SearchOutlined, UploadFileOutlined, UploadRounded, UploadSharp } from "@mui/icons-material";
import Sidebar from "../pages/sider/SiderMainPage";
import { useNavigate } from "react-router-dom";

export const AgentHeader = () => {
  const [visible, setVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate =useNavigate()
  return (
    <div className="flex justify-between items-center p-5 border shadow-sm bg-white">
      <div className="flex items-center space-x-4">
        <Button
          type="text"
          icon={<div className="text-3xl">≡</div>}
          onClick={() => setVisible(true)} // Hamburger Icon (or any other)
        />
        <h2 className="text-2xl font-semibold">Your Agents</h2>
      </div>
      <Sidebar visible={visible} setVisible ={setVisible}/>

      <div className="ml-10">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            className="rounded-full border-gray-300 w-[40vw]"
          />
        </div>
      <div className="flex space-x-4">
        <Button  icon={<UploadRounded />} className="">Import</Button>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/create-agent')}
        >
          New Agent
        </Button>
        
     
      </div>
    </div>
    
  );
};
