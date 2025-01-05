import React, { useEffect, useState } from "react";
import { Layout, Menu, Avatar, Drawer, Button } from "antd";
import {
  SettingOutlined,
  BellOutlined,
  AppstoreOutlined,
  FileOutlined,
  LineChartOutlined,
  DatabaseOutlined,
  ToolOutlined,
  QuestionCircleOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Agent } from "../../redux/agents/store";
import BiMap from "../../utils/BiMap";

const { Sider } = Layout;

interface UserType {
  id: string;
  email: string;
  name: string;
  surname: string;
  profilePic: string;
}

export const Sidebar = ({ visible, setVisible }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserType>();
  const [agents, setAgents] = useState<Agent[]>([]);

  // fetch templates from above string in pattern , something needs to be corrected here!

  const location = useLocation();
  const match = location.pathname.match(/\/([^/]+)/);
  const section = match?.[1] || "templates";

  useEffect(() => {
    const fetchUserDetails = async () => {
      const url = process.env.REACT_APP_API_URL + "/api/v1/user";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data.data);
        console.log(data.data);
      }
    };
    fetchUserDetails();
  }, []);

  useEffect(() => {
    const getAgents = async () => {
      const url = process.env.REACT_APP_API_URL + "/api/v1/user/agents";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setAgents(data.data.content);
    };
    getAgents();
  }, []);

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={250}
        style={{
          background: "#1f1f1f", // Ant Design dark menu background
          borderRight: "1px solid #002140", // Slightly lighter border to match the theme
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            paddingTop: "10px",
            borderBottom: "2px solid #f0f0f0",
          }}
        >
          <Avatar
            size="large"
            style={{ backgroundColor: "#333" }}
            src={userData?.profilePic}
          >
            A
          </Avatar>

          <div style={{ marginLeft: "10px" }}>
            <h1 style={{ margin: 0 }} className="text-lg text-white">
              {userData?.name} {userData?.surname}
            </h1>
            <span style={{ color: "#aaa" }}>Your Agent Desc.</span>
          </div>
        </div>

        <Menu
          mode="inline"
          theme="dark"
          // defaultSelectedKeys={["notifications"]}
          selectedKeys={[section]}
          style={{ border: "none", backgroundColor: "#1f1f1f" }}
          className="mt-4"
        >
          <Menu.Item
            key="templates"
            icon={<AppstoreOutlined />}
            onClick={() => navigate("/templates")}
          >
            MarketPlace
          </Menu.Item>
          <Menu.Item
            key="agents"
            icon={<TeamOutlined />}
            onClick={() => navigate("/agents")}
          >
            My Agents
          </Menu.Item>
          <Menu.Item
            key="notifications"
            icon={<BellOutlined />}
            onClick={() => navigate("/agents/create-agent")}
          >
            Create Agent
          </Menu.Item>

          <Menu.SubMenu
            key="agents"
            icon={<TeamOutlined />}
            title="List Agents"
          >
            {agents.map((agent) => (
              <Menu.Item
                key={agent.name}
                icon={<UserOutlined />}
                onClick={() => navigate(`/agents/${agent.id}/new`)}
              >
                {agent.name}
              </Menu.Item>
            ))}
          </Menu.SubMenu>
          <Menu.Item
            key="tools"
            icon={<ToolOutlined />}
            onClick={() => navigate("/tools")}
          >
            Tools
          </Menu.Item>
          <Menu.Item
            key="knowledge"
            icon={<DatabaseOutlined />}
            onClick={() => navigate("/knowledge")}
          >
            Knowledge
          </Menu.Item>
          <Menu.Item
            key="integrations"
            icon={<FileOutlined />}
            onClick={() => navigate("/integrations")}
          >
            Integrations
          </Menu.Item>
          <Menu.Item
            key="settings"
            icon={<SettingOutlined />}
            onClick={() => navigate("/settings")}
          >
            Settings
          </Menu.Item>

          <Menu.Item key="analytics" icon={<LineChartOutlined />}>
            Analytics
          </Menu.Item>

          <Menu.Divider />
          <Menu.Item key="tutorials" icon={<QuestionCircleOutlined />}>
            Tutorials
          </Menu.Item>
          <Menu.Item key="documentation" icon={<FileOutlined />}>
            Documentation
          </Menu.Item>

          <Menu.Item key="help" icon={<QuestionCircleOutlined />}>
            Need help?
          </Menu.Item>
        </Menu>
        <div className="flex justify-center mt-4 px-3 bg-gray-100 rounded-md">
          <Button
            type="text"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/onboarding");
            }}
            className="text-gray-200"
          >
            Logout
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default Sidebar;
