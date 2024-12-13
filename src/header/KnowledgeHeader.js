import React, { useState } from "react";
import { Input, Button, Drawer } from "antd";
import { Dropdown, Menu } from "antd";

import {
  MenuOutlined,
  SearchOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Sidebar from "../pages/sider/SiderMainPage";
import DropdownMenu from "../pages/knowledge/DropDown";

const KnowledgeHeader = () => {
  const [visible, setVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const menu = (
    <Menu
      className="bg-white shadow-lg rounded-md p-2"
      items={[
        {
          label: (
            <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer rounded-md">
              <strong className=" text-gray-700  text-sm">Blank</strong>
              <p className="text-gray-500 text-xs">Start with an empty table</p>
            </div>
          ),
          key: "1",
        },
        {
          label: (
            <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer rounded-md">
              <strong className=" text-gray-700  text-sm">Upload file</strong>
              <p className="text-gray-500 text-xs">
                CSV, Excel, JSON, PDF or Audio
              </p>
            </div>
          ),
          key: "2",
        },
        {
          label: (
            <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer rounded-md">
              <strong className=" text-gray-700  text-sm">Import from website</strong>
              <p className="text-gray-500 text-xs">
                Extract content from a website
              </p>
            </div>
          ),
          key: "3",
        },
        {
          label: (
            <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer rounded-md">
              <strong className="text-gray-700 text-sm">Integrations</strong>
              <p className="text-gray-500 text-xs">
                Import data from a third party
              </p>
            </div>
          ),
          key: "4",
        },
      ]}
    />
  );

  return (
    <div className="flex items-center justify-between  p-5 border bg-white shadow-sm">
      {/* Left Section */}
      <div className="flex items-center space-x-3">
        <MenuOutlined className="text-lg" onClick={() => setVisible(true)} />
        <h2 className="font-semibold px-3 text-2xl">Knowledge</h2>
      </div>

      {/* Center Section */}
      <Sidebar visible={visible} setVisible={setVisible} />
      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <div className="">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            className="rounded-full border-gray-300 w-[30vw]"
          />
        </div>
    
        <Dropdown overlay={menu} trigger={["hover", "click"]}>
          <Button type="primary" icon={<PlusOutlined />} className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
          Create Table
          </Button>
        </Dropdown>
        <Drawer
          title="Add New Table"
          placement="right"
          width={400}
          onClose={() => setDrawerVisible(false)}
          visible={drawerVisible}
        >
          {/* Form for adding new agent (can be implemented as needed) */}
          <DropdownMenu />
        </Drawer>
      </div>
    </div>
  );
};

export default KnowledgeHeader;
