import { Layout, Button, Avatar, Input } from "antd";
import { Content } from "antd/es/layout/layout";
import { RootState } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import { setCreateAgent } from "../../redux/agents/action";
import { VerifiedUserRounded } from "@mui/icons-material";
// Agent Profile Form
const AgentProfileForm = () => {
  let createAgent = useSelector((state: RootState) => state.agents.agent);
  const dispatch =useDispatch()
  return (
    <div className="p-6">
      <div className="flex items-center space-x-4 mb-6">
        <Avatar size={64} src={"https://icons.veryicon.com/png/o/miscellaneous/cookd-pc/useroutlined.png"} icon={<VerifiedUserRounded/>} />
        <div>
          <h2 className="text-xl font-semibold">Agent profile</h2>
          <p className="text-gray-500">Describe what this agent does</p>
        </div>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="Enter agent name..."
          value={createAgent.name}
          className="w-full border-gray-300 rounded-md"
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
    <div className="p-6">
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

  return (
    <Layout>
      <Content className="bg-white border p-4">
        <div className="border-b border-gray-200 p-6 mt-2">
          <h1 className="text-2xl font-bold">Agent profile</h1>
        </div>

        <div className="flex flex-col md:flex-row p-2">
          <div className="w-full md:w-2/3 border-r border-gray-200">
            <AgentProfileForm />
          </div>
          <div className="w-full md:w-1/3">
            <Integrations />
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 ">
          <Button type="primary" className="bg-blue-500">
            Confirm & continue
          </Button>
        </div>
      </Content>
    </Layout>
  );
}
