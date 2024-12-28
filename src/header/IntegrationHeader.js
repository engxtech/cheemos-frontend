import React, { useState } from "react";
import { Input, Button } from "antd";
import {
  MenuOutlined,
  SearchOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Sidebar from "../pages/sider/SiderMainPage";

const IntegrationHeader = () => {
    const [visible,setVisible]=useState(false)
  return (
    <div className="flex items-center justify-between p-5  shadow-sm bg-gray-900">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <MenuOutlined className="text-lg" onClick={()=>setVisible(true)}/>
        <h2 className="font-semibold text-2xl">API keys & integrations</h2>
      </div>

      {/* Center Section */}
      <Sidebar visible={visible} setVisible ={setVisible}/>
      {/* Right Section */}
      <div className="flex items-center space-x-6">
        <div className="hidden md:block">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            className="rounded-full border-gray-300 w-[30vw]"
          />
        </div>
        
        <Button type="primary" shape="circle" icon={<SettingOutlined />} />
      </div>
    </div>
  );
};

export default IntegrationHeader;
