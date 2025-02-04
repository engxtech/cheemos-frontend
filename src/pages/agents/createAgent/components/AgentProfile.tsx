import { Layout, Button, Avatar, Input } from "antd";
import { Content } from "antd/es/layout/layout";
import { RootState } from "../../../../redux";
import { useDispatch, useSelector } from "react-redux";
import { setCreateAgent } from "../../../../redux/agents/action";
import { VerifiedUserRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import image1 from "../../../../assets/Aatar.png";
import image2 from "../../../../assets/Aatar(1).png";
import image3 from "../../../../assets/Aatar(2).png";
import image4 from "../../../../assets/Aatar(3).png";
import image5 from "../../../../assets/Aatar(4).png";
import { useState } from "react";

// Agent Profile Form
const AgentProfileForm = () => {
  let createAgent = useSelector((state: RootState) => state.agents.agent);
  const dispatch = useDispatch();
  const images = [image1, image2, image3, image4, image5];

  const handleImageSelect = (image: string) => {
    dispatch(
      setCreateAgent({
        ...createAgent,
        iconName: image,
      })
    );
  };
  return (
    <div className="sm:p-6 text-white">
      <div className="sm:flex flex-wrap items-center space-x-4 mb-6 p-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all">
        <div className="flex justify-between">
          <Avatar
            size={64}
            src={createAgent.iconName}
            icon={<VerifiedUserRounded />}
            className="transition-all ease-in-out duration-300"
          />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">Agent profile</h2>
            <p className="text-gray-500 mt-2">Describe what this agent does.</p>
          </div>
        </div>
        <div className="flex space-x-4  p-2 rounded-md">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`avatar-option-${index}`}
              className="w-12 h-12 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
              onClick={() => handleImageSelect(image)}
            />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Input
          placeholder="Enter agent name..."
          value={createAgent.name}
          className="w-full border-gray-300  rounded-md"
          onChange={(e) => {
            dispatch(
              setCreateAgent({
                ...createAgent,
                name: e.target.value,
              })
            );
          }}
        />
        <Input.TextArea
          rows={4}
          value={createAgent.description}
          placeholder="Enter agent description..."
          className="w-full border-gray-300 rounded-md"
          onChange={(e) => {
            dispatch(
              setCreateAgent({
                ...createAgent,
                description: e.target.value,
              })
            );
          }}
        />
      </div>
    </div>
  );
};

// Integrations Section
const Integrations = () => {
  const triggers = [
    { name: "Outlook", bg: "bg-blue-500" },
    { name: "Gmail", bg: "bg-red-500" },
    { name: "HubSpot", bg: "bg-orange-500" },
    { name: "Freshdesk", bg: "bg-green-500" },
    { name: "Salesforce", bg: "bg-blue-700" },
    { name: "WhatsApp", bg: "bg-green-700" },
  ];

  return (
    <div className="p-6 text-white">
      <h3 className="text-lg font-semibold">Integrations</h3>
      <p className="text-gray-500 mb-4">
        Allow tasks to be created for your agent from other places.
      </p>

      <div className="grid grid-cols-3 gap-4">
        {triggers.map((trigger) => (
          <div
            key={trigger.name}
            className={`flex items-center justify-center py-2 px-4 rounded-md text-white ${trigger.bg}`}
          >
            {trigger.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function AgentProfile() {
  const navigate = useNavigate();
  return (
    <Layout>
      <Content className="bg-white sm:border border-gray-500 p-4">
        <div className="border-b border-gray-500 p-6 mt-2">
          <h1 className="text-2xl font-bold">Agent profile</h1>
        </div>

        <div className="flex flex-col md:flex-row p-2">
          <div className="w-full md:w-2/3 sm:border-r border-gray-500">
            <AgentProfileForm />
          </div>
          <div className="w-full md:w-1/3">
            <Integrations />
          </div>
        </div>

        <div className="p-2 flex  justify-center space-x-2 border-t border-gray-500 ">
          <Button
            type="primary"
            className="bg-blue-500"
            onClick={() => navigate("../instructions")}
          >
            Next
          </Button>
        </div>
      </Content>
    </Layout>
  );
}
