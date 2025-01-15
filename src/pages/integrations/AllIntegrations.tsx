import React, {useState} from "react";
import gitImg1 from "../../assets/github/1.jpeg"
import gitImg2 from "../../assets/github/2.jpeg"
import gitImg3 from "../../assets/github/3.jpeg"
import gitImg4 from "../../assets/github/4.jpeg"
import gitImg5 from "../../assets/github/5.jpeg"
import gitImg6 from "../../assets/github/6.jpeg"

import jiraImg1 from "../../assets/Jira/1.jpeg"
import jiraImg2 from "../../assets/Jira/2.jpeg"
import jiraImg3 from "../../assets/Jira/3.jpeg"
import jiraImg4 from "../../assets/Jira/4.jpeg"
import jiraImg5 from "../../assets/Jira/5.jpeg"
import jiraImg6 from "../../assets/Jira/6.jpeg"
import jiraImg7 from "../../assets/Jira/7.jpeg"

import slackImg1 from "../../assets/slack/1.jpeg"

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
    X, ChevronRight, ChevronLeft,
} from "lucide-react";
import IntegrationHeader from "../../header/IntegrationHeader";
import {message} from "antd";

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


interface IntegrationsName {
    name: string,
    images: string[],
}

const integrationName: IntegrationsName[] = [
    {
        name: "Slack",
        images:[slackImg1]
    },
    {
        name: "Github",
        images:[gitImg1, gitImg2, gitImg3, gitImg4, gitImg5, gitImg6]
    },
    {
        name: "Jira",
        images:[jiraImg1,jiraImg2,jiraImg3,jiraImg4,jiraImg5,jiraImg6,jiraImg7]
    },
    {
        name: "Google",
        images:[]
    },
]

function App() {

    const [selectedIntegration, setSelectedIntegration] =
        useState<Integration | null>(null);

    const [selectedIntegrationName, setSelectedIntegrationName] =
        useState<IntegrationsName | null>(integrationName[0]);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            selectedIntegrationName && prevIndex < selectedIntegrationName.images.length - 1 ? prevIndex + 1 : prevIndex
        );
    };

    const goToPreviousImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
    };

    const [formData, setFormData] = useState<FormData>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isStepsModalOpen, setIsStepModalOpen] = useState(false);

    const [dropdownOpen, setDropdownOpen] = useState(false);


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

    const handleSelectOption = (option) => {
        console.log(`${option} selected`);  // Handle the selected option
        if(option==="Slack"){
            setSelectedIntegrationName(integrationName[0]);
        }
        else if(option==="GitHub"){
            setSelectedIntegrationName(integrationName[1]);
        }
        else if(option==="Jira"){
            setSelectedIntegrationName(integrationName[2]);
        }
        setDropdownOpen(false);  // Close dropdown after selection
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <div className="fixed top-0 left-0 right-0 z-10 bg-black shadow">
                <IntegrationHeader/>
            </div>

            <div
                className="flex-1 overflow-y-auto p-8 bg-black h-[100vh]"
                style={{paddingTop: "84px"}}
            >
                <div className=" flex justify-between">
                    <h2 className="text-xl font-semibold mb-4">
                        Connect your integrations
                    </h2>
                    <h3 className="mb-4 cursor-pointer text-blue-500 italic text-sm"
                        onClick={() => setIsStepModalOpen(true)}>
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
                                <integration.icon className="h-6 w-6 text-gray-300 flex-shrink-0"/>
                                <div>
                                    <h3 className="text-sm font-medium text-white">
                                        {integration.name}
                                    </h3>
                                    <p className="text-sm text-gray-400">
                                        {integration.connected}
                                    </p>
                                </div>
                            </div>
                            <button
                                className="px-4 py-1 text-sm  text-white hover:text-indigo-300 transition-colors duration-200 w-full sm:w-auto">
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
                                <selectedIntegration.icon className="h-6 w-6 text-gray-300"/>
                                <h2 className="text-lg font-medium text-white">
                                    Connect {selectedIntegration.name}
                                </h2>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
                            >
                                <X className="h-5 w-5"/>
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
                            <div
                                className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
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

            {isStepsModalOpen && selectedIntegrationName && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center p-2 z-50 items-center lg:items-start">
                    <div className="bg-gray-800 rounded-lg p-6 w-[95%] shadow-2xl h-[40%] md:h-[50%] lg:h-[70%] xl:h-[95%] overflow-y-auto">
                        <div className="flex justify-between items-center">
                            <div className="flex justify-center space-x-3">
                                <h2 className="text-lg font-medium text-white text-center w-full mb-4">
                                    {selectedIntegrationName.name} Integration
                                </h2>
                            </div>

                            <div className="relative">
                                <button
                                    onClick={() => setIsStepModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
                                >
                                    <X className="h-5 w-5"/>
                                </button>

                                {/* Dropdown Button */}
                                <button
                                    className="text-gray-400 hover:text-gray-300 transition-colors duration-200 ml-4"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <span className="h-5 w-5">⋮</span> {/* Three dots for dropdown */}
                                </button>

                                {/* Dropdown Menu */}
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-gray-700 text-white rounded-lg shadow-lg z-50">
                                        <ul>
                                            <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer" onClick={() => handleSelectOption('Slack')}>Slack</li>
                                            <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer" onClick={() => handleSelectOption('GitHub')}>GitHub</li>
                                            <li className="px-4 py-2 hover:bg-gray-600 cursor-pointer" onClick={() => handleSelectOption('Jira')}>Jira</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Images mapping */}
                        {selectedIntegrationName.images && selectedIntegrationName.images.length > 0 && (
                            <div className="flex justify-center items-center relative mb-2">
                                <img
                                    src={selectedIntegrationName.images[currentImageIndex]}
                                    alt={`Integration image ${currentImageIndex + 1}`}
                                    className="max-w-full h-auto object-cover rounded-lg shadow-md"
                                />

                                {/* Left Arrow */}
                                <button
                                    onClick={goToPreviousImage}
                                    disabled={currentImageIndex === 0}
                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-gray-700 p-2 rounded-full hover:bg-gray-600 disabled:opacity-50"
                                >
                                    <ChevronLeft className="h-6 w-6" />
                                </button>

                                {/* Right Arrow */}
                                <button
                                    onClick={goToNextImage}
                                    disabled={currentImageIndex === selectedIntegrationName.images.length - 1}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-gray-700 p-2 rounded-full hover:bg-gray-600 disabled:opacity-50"
                                >
                                    <ChevronRight className="h-6 w-6" />
                                </button>
                            </div>
                        )}

                        {/* Other modal content */}
                    </div>
                </div>
            )}



        </div>
    );
}

export default App;
