import React, { useState } from "react";
import { Button, Drawer, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  FileUpload,
  SearchOutlined,
  UploadFileOutlined,
  UploadRounded,
  UploadSharp,
} from "@mui/icons-material";
import Sidebar from "../pages/sider/SiderMainPage";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCreateAgent, setEditing } from "../redux/agents/action";
import { defaultAgent } from "../redux/agents/store";

export const AgentHeader = () => {
  const [visible, setVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between items-center p-5  shadow-sm bg-gray-900">
      <div className="flex items-center space-x-4">
        <Button
          type="text"
          icon={<div className="text-3xl text-gray-800">≡</div>}
          onClick={() => setVisible(true)} // Hamburger Icon (or any other)
        />
        <h2 className="text-2xl  font-semibold">Your Agents</h2>
      </div>
      <Sidebar visible={visible} setVisible={setVisible} />

      <div className="ml-10 hidden md:block">
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined />}
          className="rounded-full border-gray-300 bg-gray-200 w-[40vw]"
        />
      </div>
      <div className="flex space-x-4">
        <Button icon={<UploadRounded />} className="">
          Import
        </Button>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            dispatch(setEditing(false));
            dispatch(setCreateAgent(defaultAgent));
            navigate("/agents/create-agent");
          }}
        >
          Agent
        </Button>
      </div>
    </div>
  );
};
