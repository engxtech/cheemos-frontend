import React from "react";
import { Button, Input, Tabs } from "antd";

export const ToolSettings = () => {
  const tools = [
    {
      title: "Analyse CSV",
      description: "Analyse CSV data, please be specific about your question",
    },
    {
      title: "Create email sequence",
      description: "For Rosh Singh's Sales Research & Qualifier Agent.",
    },
    {
      title: "Extract content from website",
      description: "For Rosh Singh's Sales Research & Qualifier Agent.",
    },
    {
      title: "Get LinkedIn Company breakdown",
      description:
        "Use this to get a breakdown of total number of jobs and employees.",
    },
  ];

  const tabs = [
    { key: "1", label: "Your tools" },
    { key: "2", label: "All templates" },
    { key: "3", label: "Popular 4" },
    { key: "4", label: "Marketing 11" },
    { key: "5", label: "Operations 11" },
    { key: "6", label: "Project Management 1" },
  ];

  return (
    <div className="p-6">
      {/* Heading */}
      <div className="text-lg font-semibold mb-4">Tool settings / All tools</div>

      {/* Add Tool Button */}
      <div className="mb-4">
        <Button type="primary" className="mb-2">
          + Add tool
        </Button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <Input.Search
          placeholder="Search for tool..."
          className="w-full"
          allowClear
        />
      </div>

      {/* Tabs */}
      <Tabs
        defaultActiveKey="1"
        items={tabs}
        className="mb-6"
        onChange={(key) => console.log("Selected Tab: ", key)}
      />

      {/* Tool List */}
      <div className="space-y-4">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border rounded shadow"
          >
            <div>
              <div className="font-medium">{tool.title}</div>
              <div className="text-sm text-gray-500">{tool.description}</div>
            </div>
            <Button type="primary">+ Add</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolSettings;
