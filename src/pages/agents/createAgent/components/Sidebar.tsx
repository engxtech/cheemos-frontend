// Sidebar Component
import { Layout, Menu, Avatar, Input, Button, Divider } from "antd";
import { InboxOutlined, SettingOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import BiMap from "../../../../utils/BiMap";
import { MenuOpenOutlined, MenuOutlined } from "@mui/icons-material";
import { useMediaQuery } from "react-responsive";

export const Sidebar = ({ sidebarVisible, setSidebarVisible }) => {
  const navigate = useNavigate();
  const editing = useSelector((state: RootState) => state.agents.editing);
  const CreateAgent = useSelector((State: RootState) => State.agents.agent);
  const handleSave = async () => {
    console.log(CreateAgent);
    // return
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
  const match = location.pathname.match(
    /\/agents\/create-agent\/([^/]+)(?=\/|$)/
  );
  const section = match ? match[1] : null;
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  let defMenuKey = prmMpKey.getNumber(section) || 1;
  // add a condition to check if this mobile view or not
  return (
    <Sider
      width={245}
      // className="border-r border-gray-300"
      breakpoint="lg"
      collapsedWidth="0"
      collapsed={!sidebarVisible && !isDesktop} // check if desktop view then it should not collapse
      onCollapse={(collapsed) => setSidebarVisible(!collapsed)}
      trigger={
          <MenuOutlined style={{ fontSize: "36px" }} /> // Default icon when expanded
      }
      style={{backgroundColor: "#1f1f1f" }}
    >
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={[defMenuKey.toString()]}
        style={{  backgroundColor: "#1f1f1f" }}
        className="h-[97vh]  shadow-md  sm:border border-gray-500 py-10 text-[0.9rem] "
      >
        <Menu.Item
          key="1"
          icon={<InboxOutlined />}
          onClick={() => {
            navigate("./profile");
            setSidebarVisible(false);
          }}
        >
          Agent profile
        </Menu.Item>
        <span className="text-[0.8rem] p-4 text-gray-500 block">
          Agent instructions
        </span>
        <Menu.Item
          key="2"
          icon={<SettingOutlined />}
          onClick={() => {
            navigate("./instructions");
            setSidebarVisible(false);
          }}
        >
          Instructions
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<SettingOutlined />}
          onClick={() => {
            navigate("./flow");
            setSidebarVisible(false);
          }}
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
          onClick={() => {
            navigate("./settings");
            setSidebarVisible(false);
          }}
        >
          Advanced settings
        </Menu.Item>
        <Menu.Item
          key="5"
          icon={<SettingOutlined />}
          onClick={() => {
            navigate("./tools");
            setSidebarVisible(false);
          }}
        >
          Tools
        </Menu.Item>
        <Menu.Item
          key="7"
          icon={<SettingOutlined />}
          onClick={() => {
            navigate("./subagents");
            setSidebarVisible(false);
          }}
        >
          SubAgents
        </Menu.Item>
        <span className="text-[0.8rem] p-4 text-gray-500 block">More Info</span>
        <Menu.Item
          key="6"
          icon={<SettingOutlined />}
          onClick={() => {
            navigate("./configure-templates");
            setSidebarVisible(false);
          }}
        >
          Abilities
        </Menu.Item>

        <div className="flex space-x-3 ml-6 mt-6">
          <Button
            type="default"
            className="mt-2 ml-2 text-gray-900 "
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
