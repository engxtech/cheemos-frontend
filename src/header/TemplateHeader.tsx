import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Drawer,
  Dropdown,
  List,
  Menu,
  message,
  notification,
  Switch,
  Tag,
  Tooltip,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  AddOutlined,
  CopyAllOutlined,
  DeleteOutlined,
  FileUpload,
  MenuOutlined,
  NotificationAddRounded,
  ToggleOnOutlined,
  UploadFileOutlined,
  UploadRounded,
  UploadSharp,
  VerifiedUserOutlined,
} from "@mui/icons-material";
import Sidebar from "../pages/sider/SiderMainPage";
import { Agent } from "../redux/agents/store";
import { BellPlusIcon } from "lucide-react";

const updates = [
  {
    version: "v3.0.6",
    date: "November 28, 2024",
    details: [
      "Enhancement: IF else flow corrected",
      "Enhancement: Result page UI enhanced",
    ],
  },
  {
    version: "v3.0.5",
    date: "November 22, 2024",
    details: [
      "Enhancement: Enhanced flow of web recorder",
      "Enhancement: Added run on any device feature",
      "Enhancement: More conditions are added to IF case",
    ],
  },
  {
    version: "v3.0.4",
    date: "November 18, 2024",
    details: [
      "Enhancement: Web run in local enabled and provising profile for IOS completed!",
      "Enhancement: Cloud testcase & element recorder for Android is enabled",
      "Bug fixes of result screen showing passed and failed steps and Dashboard UI enhancement",
    ],
  },
  {
    version: "v3.0.3",
    date: "November 11, 2024",
    details: [
      "Enhancement: Pagination features added to testcases and test data, limit of testcases shown while adding to test-suites increased to 50 for now!",
      "Enhancement: Ai Steps fucntionality improved and web integrated",
      "Bug fixes of ai step writing and enhancement for editing step to load prev. data",
    ],
  },
  {
    version: "v3.0.2",
    date: "October 29, 2024",
    details: [
      "Enhancement: Copy testdata functionality on all testdatas page & integrate slack doc available in plugins",
      "Enhancement: Curl to add appURL, start,stop and see status of a plan",
      "Bug fixes of testcases and enhancement for editing step to load prev. data",
    ],
  },
  {
    version: "v3.0.1",
    date: "October 25, 2024",
    details: [
      "Enhancement: Added copy testdata functionality(available inside edit test-data feature).",
      "Enhancement: Unity step with AI and Autoheal v2.0 deployed",
      "Bug fixes of test-data",
    ],
  },
  {
    version: "v3.0.0",
    date: "October 24, 2024",
    details: [
      "Enhancement: Added search, filter on test suites, testdata, page objects.",
      "Enhancement: Added disable step,ignore step failure, ignore prerequiste failure filter on test suites, testdata, page objects.",
      "Bug fixes",
    ],
  },
  {
    version: "v2.9.0",
    date: "October 19, 2024",
    details: [
      "iOS Simulators: Removed dependency on idb preinstallation for execution on iOS emulators",
      "Mobile Web: Recorder now available for test case recording",
      "Bug fixes",
    ],
  },
  {
    version: "v2.8.0",
    date: "October 18, 2024",
    details: [
      "Added autoheal feature in the ai step",
      "Unity Games are automated using AI",
      "Feature Enhancement",
    ],
  },
  {
    version: "v2.8.0",
    date: "October 17, 2024",
    details: [
      "Recorder: IOS Native available in beta version to test",
      "iOS: Support for m1 platform",
      "Bug fixes",
    ],
  },
  {
    version: "v2.7.0",
    date: "October 16, 2024",
    details: ["Added URL option to fetch and refresh your test data profiles"],
  },
];

export const TemplateHeader = () => {
  const [visible, setVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerVisibleN, setDrawerVisibleN] = useState(false);
  const [releaseType, setReleaseType] = useState<string>("");

  const handleMenuClick = (e: any) => {
    setReleaseType(e.key); // Set selected release type
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="MAJOR">Major</Menu.Item>
      <Menu.Item key="MINOR">Minor</Menu.Item>
      <Menu.Item key="HOT_FIX">Hotfix</Menu.Item>
    </Menu>
  );
  const [agents, setAgents] = useState<Agent[]>([]);

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
      setAgents(data.data);
    };
    getAgents();
  }, []);
  const publishAgent = async (id) => {
    const url = process.env.REACT_APP_API_URL + `/api/v1/template/create`;
    const payload = {
      agentId: id,
      releaseType: releaseType,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      message.success("Template created successfully");
      setDrawerVisible(false);
    }
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkMode = localStorage.getItem("darkmode") === "true";
    setIsDarkMode(darkMode);
    updateBodyClass(darkMode);
  }, []);

  const updateBodyClass = (darkMode) => {
    document.body.classList.toggle("dark-mode", darkMode);
  };

  const handleToggle = (checked) => {
    setIsDarkMode(checked);
    localStorage.setItem("darkmode", checked.toString());
    updateBodyClass(checked);
  };

  return (
    <div className="flex justify-between items-center p-5 ">
      <div className="flex items-center space-x-4">
        {/* <Button
          type="text"
          icon={<div className="text-3xl ">≡</div>}
          onClick={() => setVisible(true)} // Hamburger Icon (or any other)
        /> */}
        <MenuOutlined className="text-xl text-gray-800" onClick={() => setVisible(true)} />
        <h2 className="text-2xl font-semibold">Market Place</h2>
      </div>
      <Sidebar visible={visible} setVisible={setVisible} />
      <div className="flex space-x-4 ">
        <Tooltip title="Dark Mode" placement="top">
          <Switch
            checked={isDarkMode}
            onChange={handleToggle}
            className="mt-1"
          />
        </Tooltip>{" "}
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setDrawerVisible(true)}
        >
          Publish Agent
        </Button>
        <Button type="text">
          <div
            className="text-2xl px-1 py-1 text-gray-800"
            onClick={() => setDrawerVisibleN(true)}
          >
            {" "}
            <BellPlusIcon />
          </div>{" "}
        </Button>
        <Drawer
          title="Publish Your Agent"
          placement="right"
          width={400}
          onClose={() => setDrawerVisible(false)}
          visible={drawerVisible}
        >
          {agents.map((agent, index) => (
            <Card
              key={agent.id}
              title={
                <p className="flex items-center space-x-2">
                  <Avatar
                    icon={<VerifiedUserOutlined />}
                    className="p-1"
                    alt="avatar"
                  />{" "}
                  <p>{agent.name}</p>
                </p>
              }
              className="shadow-md border bg-gray-50 rounded-lg mt-2"
              actions={[
                <Dropdown overlay={menu} trigger={["click"]}>
                  <Button>
                    {releaseType ? `Selected: ${releaseType}` : "Release Type"}
                  </Button>
                </Dropdown>,
                <Button
                  key="add"
                  type="primary"
                  onClick={() => publishAgent(agent.id)}
                >
                  <AddOutlined className="text-white border bg-white rounded-full" />
                  Publish Agent
                </Button>,
              ]}
            >
              <p>{agent.description}</p>
            </Card>
          ))}
        </Drawer>
        <Drawer
          title={<span className="text-gray-800">What's new on Cheemos!</span>}
          placement="right"
          width={400}
          onClose={() => setDrawerVisibleN(false)}
          visible={drawerVisibleN}
          style={{
            background: "#001529", // Ant Design dark menu background
            borderRight: "1px solid #002140", // Slightly lighter border to match the theme
          }}
        >
          <List
            dataSource={updates}
            renderItem={(item) => (
              <Card
                style={{ marginBottom: 16 }}
                bordered={false}
                className="border shadow-md"
              >
                <Tag color="blue">NEW</Tag>
                <span style={{ marginLeft: 8, color: "#8c8c8c" }}>
                  {item.date}
                </span>
                <h3 style={{ marginTop: 8 }}>{item.version}</h3>
                <ul>
                  {item.details.map((detail, index) => (
                    <li key={index}>
                      {
                        <span className="text-[0.9rem]  font-serif text-gray-600 bold">
                          {detail}
                        </span>
                      }
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          />
        </Drawer>
      </div>
    </div>
  );
};
