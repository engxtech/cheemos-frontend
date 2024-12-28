// Sidebar Component
import { Layout, Menu, Avatar, Input, Button, Divider } from "antd";
import { InboxOutlined, SettingOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import BiMap from "../../../../utils/BiMap";

export const Sidebar = () => {
  const navigate = useNavigate();
  const editing = useSelector((state: RootState) => state.agents.editing);
  const CreateAgent = useSelector((State: RootState) => State.agents.agent);
  const handleSave = async () => {
    let url = process.env.REACT_APP_API_URL + "/api/v1/agent/new";
    if (editing)
      url = process.env.REACT_APP_API_URL + `/api/v1/agent/${CreateAgent.id}`;
    const response = await fetch(url, {
      method: editing ? "PATCH" : "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(CreateAgent),
    });
    if (response.ok) {
      navigate("/agents");
    }
  };
  const prmMpKey = new BiMap();
  prmMpKey.addMapping(1, "profile");
  prmMpKey.addMapping(2, "instructions");
  prmMpKey.addMapping(3, "flow");
  prmMpKey.addMapping(4, "settings");
  prmMpKey.addMapping(5, "tools");
  prmMpKey.addMapping(6, "configure-templates");
  prmMpKey.addMapping(7, "subagents");
  const location = useLocation();
  const match = location.pathname.match(/\/agents\/create-agent\/([^/]+)(?=\/|$)/);
  const section = match ? match[1] : null;

  let defMenuKey = prmMpKey.getNumber(section) || 1;
  return (
    <Sider
      width={245}
      // className="border-r border-gray-300"
      breakpoint="lg"
      collapsedWidth="0"
    >
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={[defMenuKey.toString()]}
        style={{backgroundColor: "#1f1f1f" }}
        className="h-[96vh]  shadow-md  border py-10 text-[0.9rem] "
      >
        <Menu.Item
          key="1"
          icon={<InboxOutlined />}
          onClick={() => navigate("./profile")}
        >
          Agent profile
        </Menu.Item>
        <span className="text-[0.8rem] p-4 text-gray-500 block">
          Agent instructions
        </span>
        <Menu.Item
          key="2"
          icon={<SettingOutlined />}
          onClick={() => navigate("./instructions")}
        >
          Instructions
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<SettingOutlined />}
          onClick={() => navigate("./flow")}
        >
          Flow builder
        </Menu.Item>
        <span className="text-[0.8rem] p-4  text-gray-500 block">
          Agent Settings
        </span>
        <Menu.Item
          key="4"
          icon={<SettingOutlined />}
          className=""
          onClick={() => navigate("./settings")}
        >
          Advanced settings
        </Menu.Item>
        <Menu.Item
          key="5"
          icon={<SettingOutlined />}
          onClick={() => navigate("./tools")}
        >
          Tools
        </Menu.Item>
        <Menu.Item
          key="7"
          icon={<SettingOutlined />}
          onClick={() => navigate("./subagents")}
        >
          SubAgents
        </Menu.Item>
        <span className="text-[0.8rem] p-4 text-gray-500 block">More Info</span>
        <Menu.Item
          key="6"
          icon={<SettingOutlined />}
          onClick={() => navigate("./configure-templates")}
        >
          Abilities
        </Menu.Item>

        <div className="flex space-x-3 ml-6 mt-6">
          <Button
            type="text"
            className="mt-2 ml-2 text-gray-200"
            onClick={() => navigate("/agents")}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            className="mt-2 ml-2"
            onClick={() => handleSave()}
          >
            Save
          </Button>
        </div>
      </Menu>
    </Sider>
  );
};
