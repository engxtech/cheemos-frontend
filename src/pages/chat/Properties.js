import React from "react";
import { Tag, Tooltip, Button } from "antd";
import { CalendarOutlined, BookOutlined, FileOutlined } from "@ant-design/icons";

const PropertiesPanel = () => {
  return (
    <div className="p-6 rounded-lg shadow-md bg-white w-[22vw] h-screen">
      {/* Triggered By */}
      <div className="mb-4">
        <h3 className="text-gray-600 text-xs mb-1">Triggered by</h3>
        <p className="text-black text-xs ">Abhishek Kumar</p>
      </div>

      {/* Status */}
      <div className="mb-4">
        <h3 className="text-gray-600 text-xs mb-1">Status</h3>
        <Tag color="blue" className="text-xs">
          Inactive
        </Tag>
      </div>

      {/* Labels */}
      <div className="mb-4">
        <h3 className="text-gray-600 text-xs mb-1">Labels</h3>
        <p className="text-gray-500">No labels</p>
        <Button type="link" className="p-0">
          + Add label
        </Button>
      </div>

      {/* Date Created */}
      <div className="mb-4">
        <h3 className="text-gray-600 text-xs mb-1">Date created</h3>
        <p className="text-black ">Nov 21 2024 @ 3:11 PM</p>
      </div>

      {/* Credits */}
      <div className="mb-4">
        <h3 className="text-gray-600 text-xs mb-1">Credits</h3>
        <Tooltip title="Credits used by this action">
          <p className="text-black ">8.3</p>
        </Tooltip>
      </div>

      {/* Schedule */}
      <div className="mb-4">
        <h3 className="text-gray-600 text-xs mb-1">Schedule</h3>
        <p className="text-gray-500">No scheduled actions</p>
      </div>

      {/* Connected Tools */}
      <div>
        <h3 className="text-gray-600 text-xs mb-1">Connected tools</h3>
        <div className="flex items-center gap-2 mb-2">
          <BookOutlined className="text-xs" />
          <span className="text-xs">Read PDF</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <FileOutlined className="text-xs" />
          <span className="text-xs">Analyse CSV</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <CalendarOutlined className="text-xs text-blue-500" />
          <span className="text-xs">Get LinkedIn Company breakdown</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarOutlined className="text-xs text-blue-500" />
          <span className="text-xs">Get LinkedIn Company breakdown</span>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPanel;
