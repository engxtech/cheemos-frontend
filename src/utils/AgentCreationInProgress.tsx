import React from "react";

interface AgentInProgressModalProps {
    text: string;
}

const AgentInProgressModal: React.FC<AgentInProgressModalProps> = ({ text }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Your Agent {text} is in Progress</h2>
        <p className="text-gray-600 mt-2">
          Please wait while we prepare your agent. This may take a few moments.
        </p>
      </div>
    </div>
  );
};

export default AgentInProgressModal;
