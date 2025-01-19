import React, { useEffect, useState } from "react";
import {
    Github,
    Slack,
    MessageSquare,
    ChevronDown,
    ChevronUp,
    X,
    ChevronRight,
    ChevronLeft,
    DropletOffIcon,
} from "lucide-react";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { setIntegrations } from "../../redux/integrations/action";
import IntegrationHeader from "../../header/IntegrationHeader";
import gitImg1 from "../../assets/github/1.jpeg";
import gitImg2 from "../../assets/github/2.jpeg";
import gitImg3 from "../../assets/github/3.jpeg";
import gitImg4 from "../../assets/github/4.jpeg";
import gitImg5 from "../../assets/github/5.jpeg";
import gitImg6 from "../../assets/github/6.jpeg";

import jiraImg1 from "../../assets/Jira/1.jpeg";
import jiraImg2 from "../../assets/Jira/2.jpeg";
import jiraImg3 from "../../assets/Jira/3.jpeg";
import jiraImg4 from "../../assets/Jira/4.jpeg";
import jiraImg5 from "../../assets/Jira/5.jpeg";
import jiraImg6 from "../../assets/Jira/6.jpeg";
import jiraImg7 from "../../assets/Jira/7.jpeg";

import slackImg1 from "../../assets/slack/1.jpeg";
import { ArrowDropDownCircleOutlined, ArrowDropDownSharp, CloseOutlined } from "@mui/icons-material";
import IntegrationCard from "./IntegrationCard";

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

interface IntegrationsName {
    name: string;
    images: string[];
}

const integrationName: IntegrationsName[] = [
    {
        name: "Slack",
        images: [slackImg1],
    },
    {
        name: "Github",
        images: [gitImg1, gitImg2, gitImg3, gitImg4, gitImg5, gitImg6],
    },
    {
        name: "Jira",
        images: [
            jiraImg1,
            jiraImg2,
            jiraImg3,
            jiraImg4,
            jiraImg5,
            jiraImg6,
            jiraImg7,
        ],
    },
    {
        name: "Google",
        images: [],
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

    const [integrationData, setIntegrationData] = useState(null);

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
                    if (data && data.data) {
                        dispatch(setIntegrations(data.data));
                        setIntegrationData(data.data);
                        const newFormData: FormData = {};
                        Object.entries(data.data).forEach(([key, value]) => {
                            if (value && typeof value === "string") {
                                newFormData[key] = value;
                            }
                        });
                        setFormData(newFormData);
                    }
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
    const [selectedIntegrationName, setSelectedIntegrationName] =
        useState<IntegrationsName | null>(integrationName[0]);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            (
                selectedIntegrationName &&
                prevIndex < selectedIntegrationName.images.length - 1
            ) ?
                prevIndex + 1
                : prevIndex
        );
    };

    const goToPreviousImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
    };
    const [isStepsModalOpen, setIsStepModalOpen] = useState(false);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const handleSelectOption = (option) => {
        console.log(`${option} selected`); // Handle the selected option
        if (option === "Slack") {
            setSelectedIntegrationName(integrationName[0]);
        } else if (option === "GitHub") {
            setSelectedIntegrationName(integrationName[1]);
        } else if (option === "Jira") {
            setSelectedIntegrationName(integrationName[2]);
        }
        setCurrentImageIndex(0)
        setDropdownOpen(false); // Close dropdown after selection
    };

    return (
        <div className=" bg-gray-900">
            <div className="fixed top-0 left-0 right-0 z-10 bg-black shadow"></div>
            <IntegrationHeader />
            <div
                className="flex-1 h-[90vh] overflow-y-auto p-6 bg-black"
                style={{ paddingTop: "25px" }}
            >
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold mb-4 text-white">
                        Connect your integrations
                    </h2>
                    <h3
                        className="mb-4 cursor-pointer text-blue-500 italic text-sm"
                        onClick={() => setIsStepModalOpen(true)}
                    >
                        Watch Steps to connect Integrations
                    </h3>
                </div>

                <div className="space-y-2">
                    {integrations.map((integration) => (
                        <IntegrationCard key={integration.name} integration={integration} data={integrationData} />
                    ))}
                </div>

            </div>
            {isStepsModalOpen && selectedIntegrationName && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center p-2 z-50 items-center">
                    <div className="bg-gray-800 rounded-lg p-6 w-[94%] shadow-2xl h-[40%] md:h-[50%] lg:h-[70%] xl:h-[96%] overflow-y-auto">
                        <div className="flex justify-between items-center">
                            <div className="flex justify-center space-x-3">
                                <h2 className="text-lg font-medium text-white text-center w-full mb-4">
                                    {selectedIntegrationName.name} Integration
                                </h2>
                            </div>

                            <div className="relative">
                                {/* Dropdown Button */}
                                <button
                                    className="text-gray-400 hover:text-gray-300 transition-colors duration-200 mr-5"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <span className="h-5 w-5 font-bold text-white text-wod">
                                        <ArrowDropDownSharp className="border text-white rounded-lg" />
                                    </span>{" "}
                                    {/* Three dots for dropdown */}
                                </button>

                                <button
                                    onClick={() => setIsStepModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-300 transition-colors duration-200"
                                >
                                    <CloseOutlined className="h-5 w-5 border rounded-lg" />
                                </button>

                                {/* Dropdown Menu */}
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-gray-700 text-white rounded-lg shadow-lg z-50">
                                        <ul>
                                            <li
                                                className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                                                onClick={() => handleSelectOption("Slack")}
                                            >
                                                Slack
                                            </li>
                                            <li
                                                className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                                                onClick={() => handleSelectOption("GitHub")}
                                            >
                                                GitHub
                                            </li>
                                            <li
                                                className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                                                onClick={() => handleSelectOption("Jira")}
                                            >
                                                Jira
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Images mapping */}
                        {selectedIntegrationName.images &&
                            selectedIntegrationName.images.length > 0 && (
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
                                        disabled={
                                            currentImageIndex ===
                                            selectedIntegrationName.images.length - 1
                                        }
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-gray-700 p-2 rounded-full hover:bg-gray-600 disabled:opacity-50"
                                    >
                                        <ChevronRight className="h-6 w-6" />
                                    </button>
                                </div>
                            )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;