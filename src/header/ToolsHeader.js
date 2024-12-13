import React, { useState } from "react";
import { Input, Button } from "antd";
import {
  MenuOutlined,
  SearchOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Sidebar from "../pages/sider/SiderMainPage";

const ToolHeader = () => {
    const [visible,setVisible]=useState(false)
  return (
    <div className="flex items-center justify-between p-5 border bg-white shadow-sm">
      {/* Left Section */}
      <div className="flex items-center space-x-3">
        <MenuOutlined className="text-xl" onClick={()=>setVisible(true)}/>
        <h2 className="font-semibold text-2xl px-2">Your Tools</h2>
      </div>

      {/* Center Section */}
      <Sidebar visible={visible} setVisible ={setVisible}/>
      <div className="ml-10">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            className="rounded-full border-gray-300 w-[40vw]"
          />
        </div>
      {/* Right Section */}
      <div className="flex items-center space-x-4">
     
        <Button className="flex items-center">
          <SettingOutlined className="mr-1 text-[1rem]" /> Custom actions
        </Button>
        <Button type="primary" shape="circle" icon={<PlusOutlined />} />
      </div>
    </div>
  );
};

export default ToolHeader;
