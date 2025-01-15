import React, { useState } from "react";
import {
  Github,
  Slack,
  Mail,
  LayoutGrid,
  MessageSquare,
  Headphones,
  LineChart,
  Video,
  Linkedin,
  Building2,
  X,
} from "lucide-react";
import IntegrationHeader from "../../header/IntegrationHeader";
import { message } from "antd";

interface IntegrationField {
  name: string;
  type: "text" | "password" | "url";
  required: boolean;
  placeholder?: string;
}

interface Integration {
  name: string;
  connected: string;
  icon: React.ElementType;
  tokenName: string;
  fields: IntegrationField[];
}

const integrations: Integration[] = [
  {
    name: "Google (Gmail, Calendar & API)",
    connected: "1 connected account",
    icon: Mail,
    tokenName: "API Key",
    fields: [
      {
        name: "apiKey",
        type: "password",
        required: true,
        placeholder: "Enter your API key",
      },
      {
        name: "callbackUrl",
        type: "url",
        required: true,
        placeholder: "Callback URL",
      },
    ],
  },
  {
    name: "Microsoft & Outlook",
    connected: "0 connected accounts",
    icon: LayoutGrid,
    tokenName: "Client Secret",
    fields: [
      {
        name: "clientId",
        type: "text",
        required: true,
        placeholder: "Client ID",
      },
      {
        name: "clientSecret",
        type: "password",
        required: true,
        placeholder: "Client Secret",
      },
      {
        name: "tenantId",
        type: "text",
        required: true,
        placeholder: "Tenant ID",
      },
    ],
  },
  {
    name: "Github",
    connected: "0 connected accounts",
    icon: Github,
    tokenName: "Personal Access Token",
    fields: [
      {
        name: "token",
        type: "password",
        required: true,
        placeholder: "Personal Access Token",
      },
      {
        name: "repository",
        type: "text",
        required: true,
        placeholder: "Repository name (e.g., owner/repo)",
      },
      {
        name: "branch",
        type: "text",
        required: false,
        placeholder: "Branch name (default: main)",
      },
    ],
  },
  {
    name: "Slack",
    connected: "0 connected accounts",
    icon: Slack,
    tokenName: "Bot Token",
    fields: [
      {
        name: "botToken",
        type: "password",
        required: true,
        placeholder: "Bot User OAuth Token",
      },
      {
        name: "signingSecret",
        type: "password",
        required: true,
        placeholder: "Signing Secret",
      },
      {
        name: "channel",
        type: "text",
        required: false,
        placeholder: "Default channel (optional)",
      },
    ],
  },
  // ... other integrations with their specific fields
];

interface FormData {
  [key: string]: string;
}

function App() {
  const [selectedIntegration, setSelectedIntegration] =
    useState<Integration | null>(null);
  const [formData, setFormData] = useState<FormData>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIntegrationClick = (integration: Integration) => {
    setSelectedIntegration(integration);
    setIsModalOpen(true);
    setFormData({});
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to validate and store the credentials
    console.log(`Connecting ${selectedIntegration?.name} with data:`, formData);
    setIsModalOpen(false);
    setFormData({});
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="fixed top-0 left-0 right-0 z-10 bg-black shadow">
        <IntegrationHeader />
      </div>

      <div
        className="flex-1 overflow-y-auto p-8 bg-black h-[100vh]"
        style={{ paddingTop: "84px" }}
      >
        <div className=" flex justify-between">
          <h2 className="text-xl font-semibold mb-4">
            Connect your integrations
          </h2>
          <h3 className="mb-4 cursor-pointer text-blue-500 italic text-sm" onClick={()=>message.info("This will be added soon!")}>
            Watch Steps to connect Integrations
          </h3>
        </div>

        <div className="bg-white shadow-sm rounded-lg">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-4 py-2 hover:bg-gray-700 cursor-pointer transition-colors duration-200"
              onClick={() => handleIntegrationClick(integration)}
            >
              <div className="flex items-center space-x-3 mb-1 sm:mb-0">
                <integration.icon className="h-6 w-6 text-gray-300 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-white">
                    {integration.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {integration.connected}
                  </p>
                </div>
              </div>
              <button className="px-4 py-1 text-sm  text-white hover:text-indigo-300 transition-colors duration-200 w-full sm:w-auto">
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Setup Modal */}
      {isModalOpen && selectedIntegration && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <selectedIntegration.icon className="h-6 w-6 text-gray-300" />
                <h2 className="text-lg font-medium text-white">
                  Connect {selectedIntegration.name}
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleConnect} className="space-y-4">
              {selectedIntegration.fields.map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                    {field.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </label>
                  <input
                    type={field.type}
                    id={field.name}
                    value={formData[field.name] || ""}
                    onChange={(e) =>
                      handleInputChange(field.name, e.target.value)
                    }
                    className="block w-full rounded-md py-2 px-2 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                </div>
              ))}
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors duration-200 w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors duration-200 w-full sm:w-auto"
                >
                  Connect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
