import React from "react";

const ToolSettingsAgent = () => {
    return (
        <div className="flex  bg-gray-50  border w-full rounded-md">
            {/* Sidebar */}
            <aside className="w-1/4 bg-white border-r p-4">
                <h2 className="text-sm text-gray-500 mb-4">Tool settings / All tools</h2>
                <button className="w-full py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                    + Add tool
                </button>
            </aside>

            {/* Main Section */}
            <main className="flex-1 p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-medium">Add new tool</h2>
                    <input
                        type="text"
                        placeholder="Search for tool..."
                        className="border p-2 rounded w-1/3"
                    />
                </div>

                {/* Tabs */}
                <div className="mt-6">
                    <button className="py-2 px-4 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Your tools
                    </button>
                    <button className="py-2 px-4 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                        All templates
                    </button>
                </div>

                {/* Tool Cards */}
                <div className="mt-6 grid grid-cols-1 gap-4">
                    {[...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-4  rounded-lg bg-white border"
                        >
                            <div className="flex items-center">
                                {/* Icon */}
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                                    📊
                                </div>
                                {/* Tool Info */}
                                <div>
                                    <h3 className="font-medium">Tool Name</h3>
                                    <p className="text-sm text-gray-500">
                                        Tool description goes here.
                                    </p>
                                </div>
                            </div>
                            <button className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600">
                                + Add
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ToolSettingsAgent;
