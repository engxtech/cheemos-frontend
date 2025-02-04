import React, { useState } from "react";
import { Input, Button } from "antd";
import {
  MenuOutlined,
  SearchOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Sidebar from "../pages/sider/SiderMainPage";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCreateTool, setEditingTool } from "../redux/tools/action";

const ToolHeader = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const  dispatch =useDispatch()
  const createTool = useSelector((state)=>state.tools.tool)
  return (
    <div className="flex items-center justify-between p-5 bg-gray-900 shadow-sm">
      {/* Left Section */}
      <div className="flex items-center space-x-3">
        <MenuOutlined className="text-xl" onClick={() => setVisible(true)} />
        <h2 className="font-semibold text-2xl px-2">Your Tools</h2>
      </div>

      {/* Center Section */}
      <Sidebar visible={visible} setVisible={setVisible} />
      <div className="ml-10 hidden md:block">
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined />}
          className="rounded-full border-gray-300 bg-gray-200 w-[40vw]"
        />
      </div>
      {/* Right Section */}
      <div className="flex items-center space-x-4">

        <Button
          type="primary"
          onClick={() => {
            dispatch(
              setCreateTool({
                ...createTool,
                name: "",
                description:"",
                toolType:"Python",
                content:"",
              })
            )
            dispatch(setEditingTool(false))
            navigate("/tools/create-tool")}}
          shape=""
          icon={<PlusOutlined />}
        >
          New Tool
        </Button>
      </div>
    </div>
  );
};

export default ToolHeader;
