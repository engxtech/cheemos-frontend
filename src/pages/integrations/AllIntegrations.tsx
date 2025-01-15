import React, { useEffect, useState } from "react";
import {
  Github,
  Slack,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { setIntegrations } from "../../redux/integrations/action";
import IntegrationHeader from "../../header/IntegrationHeader";

interface Integration {
  name: string;
  icon: React.ElementType;
  tokenName: string;
  key: string;
}

interface IntegrationData {
  id: string;
  userId: string;
  githubToken: string | null;
  slackToken: string | null;
  jiraToken: string | null;
}


const integrations: Integration[] = [
  {
    name: "Github",
    icon: Github,
    tokenName: "Personal Access Token",
    key: "githubToken",
  },
  {
    name: "Slack",
    icon: Slack,
    tokenName: "Bot Token",
    key: "slackToken",
  },
  {
    name: "Jira",
    icon: MessageSquare,
    tokenName: "API Token",
    key: "jiraToken",
  },
];

interface FormData {
  [key: string]: string;
}

function App() {
  const [expandedIntegration, setExpandedIntegration] = useState<string | null>(
    null
  );
  const [formData, setFormData] = useState<FormData>({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchIntegrations = async () => {
      setLoading(true);
      try {
        const url = process.env.REACT_APP_API_URL + "/api/v1/integrations";
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        if (response.ok) {
          const data = await response.json();
          dispatch(setIntegrations(data.data));

          const newFormData: FormData = {};
          Object.entries(data.data).forEach(([key, value]) => {
            if (value && typeof value === "string") {
              newFormData[key] = value;
            }
          });
          setFormData(newFormData);
        }
      } catch (error) {
        message.error("Failed to fetch integrations");
      }
      setLoading(false);
    };

    fetchIntegrations();
  }, [dispatch]);

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (key: string, e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData[key]?.trim()) {
      message.error("Please fill in all required fields");
      return;
    }

    try {
      const url =
        process.env.REACT_APP_API_URL + "/api/v1/integrations/createOrUpdate";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          [key]: formData[key],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          message.success("Integration updated successfully");
          dispatch(setIntegrations(data.data)); // Update Redux state
          setExpandedIntegration(null); // Close form
        } else {
          message.error(data.message || "Failed to update integration");
        }
      } else {
        message.error("Failed to update integration");
      }
    } catch (error) {
      message.error("Failed to update integration");
    }
  };

  const getConnectionStatus = (integration: Integration) => {
    const token = formData?.[integration.key as keyof IntegrationData];
    return token ? "Connected" : "Not connected";
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="fixed top-0 left-0 right-0 z-10 bg-black shadow"></div>
      <IntegrationHeader />
      <div
        className="flex-1 overflow-y-auto p-6 bg-black h-[100vh]"
        style={{ paddingTop: "25px" }}
      >
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Connect your integrations
          </h2>
          <h3
            className="mb-4 cursor-pointer text-blue-500 italic text-sm"
            onClick={() => message.info("This will be added soon!")}
          >
            Watch Steps to connect Integrations
          </h3>
        </div>

        <div className="bg-gray-800 shadow-sm rounded-lg divide-y divide-gray-700">
          {integrations.map((integration) => (
            <div key={integration.key} className="p-4">
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer"
                onClick={() =>
                  setExpandedIntegration(
                    expandedIntegration === integration.key ?
                      null
                    : integration.key
                  )
                }
              >
                <div className="flex items-center space-x-3">
                  <integration.icon className="h-6 w-6 text-gray-300" />
                  <div>
                    <h3 className="text-sm font-medium text-white">
                      {integration.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {getConnectionStatus(integration)}
                    </p>
                  </div>
                </div>
                {expandedIntegration === integration.key ?
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                : <ChevronDown className="h-5 w-5 text-gray-400" />}
              </div>

              {expandedIntegration === integration.key && (
                <form
                  onSubmit={(e) => handleSubmit(integration.key, e)}
                  className="mt-4 space-y-4"
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        {integration.tokenName}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData[integration.key] || ""}
                        onChange={(e) =>
                          handleInputChange(integration.key, e.target.value)
                        }
                        className="block w-full rounded-md py-2 px-3 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder={`Enter ${integration.tokenName}`}
                        required
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-3 py-1 text-xs text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors duration-200"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
