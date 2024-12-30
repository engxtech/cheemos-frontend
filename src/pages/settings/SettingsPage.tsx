import { useEffect, useState } from "react";
import {
  Input,
  Select,
  Button,
  Card,
  Typography,
  Divider,
  Avatar,
  message,
} from "antd";
import SettingsHeader from "../../header/SettingsHeader";

const { Option } = Select;
const { Title } = Typography;

export const SettingsPage = () => {
  const [openAiKey, setOpenAIKey] = useState("");
  const [openAiOrgId, setOpenAiOrgId] = useState("");
  const [openAiModel, setModelName] = useState("");
  interface UserType {
    id: string;
    email: string;
    name: string;
    surname: string;
    profilePic: string;
  }
  const models = ["GPT-3", "GPT-4", "GPT-4 Turbo"];
  const [userData, setUserData] = useState<UserType>();
  const [loading, setLoading] = useState(true);
  // Optional: Dark Mode toggle
  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
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
        setModelName(data.data.openAiModel);
        setOpenAIKey(data.data.openAiKey);
        console.log(data.data);
      }
      setLoading(false);
    };
    fetchUserDetails();
  }, []);
  const isDarkMode = localStorage.getItem("darkmode") === "true";

  const saveSettings = async () => {
    if (openAiKey === "" || openAiModel === "") {
      message.error("Please fill all fields");
      return;
    }
    const url = process.env.REACT_APP_API_URL + "/api/v1/user/openAi";
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ openAiKey, openAiModel, openAiOrgId }),
    });
    if (response.ok) {
      const data = await response.json();
      message.success("Yes");
    }
  };

  return (
    <div>
      <SettingsHeader />
      {/* {loading ? (
        <div>Loading...</div>
      ) : ( */}
        <div
          className={`min-h-full ${
            isDarkMode ? "bg-black text-white" : "bg-white text-black"
          } p-6`}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              paddingTop: "10px",
              marginBottom: "10px",
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
                {userData?.name ? userData?.name : "Loading.."}{" "}
                {userData?.surname}
              </h1>
              <span style={{ color: "#aaa" }}>
                {userData?.email ? userData?.email : "Email loading..."}
              </span>
            </div>
          </div>

          <Card
            className=""
            style={{
              border: "none",
              background: isDarkMode
                ? "radial-gradient(circle, #181717 20%, #000 80%)"
                : "#f9f9f9",
            }}
          >
            <Title level={5}>OpenAI API Settings</Title>
            <Input.Password
              placeholder="Enter OpenAI API Key"
              value={openAiKey}
              onChange={(e) => setOpenAIKey(e.target.value)}
              className="mb-2"
            />
            <span className="text-gray-200"> Select Model</span>
            <Select
              placeholder="Select Model"
              value={openAiModel}
              onChange={setModelName}
              className=" w-full"
            >
              {models.map((model) => (
                <Option key={model} value={model}>
                  {model}
                </Option>
              ))}
            </Select>
            <span className="text-gray-200 mt-2 block">
              {" "}
              Select OpenAI OrganizationID (Optional)
            </span>
            <Input
              placeholder="Enter OpenAI API Organization ID"
              value={openAiOrgId}
              onChange={(e) => setOpenAiOrgId(e.target.value)}
              className="mb-2"
            />
          </Card>
          <Divider />

          <Button
            type="primary"
            className="mt-1"
            onClick={() => saveSettings()}
          >
            Save Settings
          </Button>
        </div>
      {/* )} */}
    </div>
  );
};

export default SettingsPage;
