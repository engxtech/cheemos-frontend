import React from "react";

const SubAgentUI = () => {
    const agents = [
        {
            name: "Sales Prospect Researcher",
            description: "Is able to do in-depth research on an account and produce a report...",
        },
        {
            name: "Ratan",
            description: "He does not work on any task, assign him some tasks",
        },
        {
            name: "Untitled agent",
            description: "No description...",
        },
        {
            name: "SEO Optimized Blog Writer",
            description: "Designed by Scott Henderson, former acquisition & growth lead...",
        },
        {
            name: "Sales Prospect Outreacher",
            description: "Is able to do in-depth research on an account and create a persona...",
        },
    ];

    return (
        <div className="flex bg-gray-50 border w-full">
            {/* Sidebar */}
            <aside className="w-1/4 bg-white border-r p-4">
                <h2 className="text-sm text-gray-500 mb-4">Team settings / All sub-agents</h2>
                <button className="w-full py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                    + Add sub-agent
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-medium">Add new sub-agent</h2>
                    <input
                        type="text"
                        placeholder="Search for agent..."
                        className="border border-gray-300 p-2 rounded w-1/3"
                    />
                </div>

                {/* Agent List */}
                <ul className="space-y-4">
                    {agents.map((agent, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center p-4 bg-white rounded shadow border"
                        >
                            <div>
                                <h3 className="font-medium">{agent.name}</h3>
                                <p className="text-sm text-gray-500">{agent.description}</p>
                            </div>
                            <button className=" bg-blue-500 text-white py-1 px-4 rounded hover:bg-gray-300">
                                + Add
                            </button>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
};

export default SubAgentUI;
