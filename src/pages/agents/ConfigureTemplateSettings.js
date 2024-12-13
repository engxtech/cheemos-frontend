import React from "react";
import { Button } from "antd";

const ConfigureTemplateSettings = () => {
  const options = [
    "Text input",
    "Long text input",
    "Options dropdown",
    "Numeric input",
    "Checkbox",
    "Text list",
    "JSON",
    "List of JSONs",
    "File to text",
    "File to URL",
    "Multiple files to URLs",
    "Table",
    "API key input",
    "OAuth account",
    "Tool approval",
  ];

  return (
    <div className=" bg-gray-100 border p-6 flex justify-center items-start h-[96vh] w-full">
      <div className="bg-white rounded-lg shadow-sm p-6 w-full max-w-4xl border">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Configure template settings
        </h2>
        {/* Subtitle */}
        <p className="text-sm text-gray-600 mb-6">
          Set up custom properties that can be re-used across your agent
          (accessible via ). Particularly useful for abstracting inputs for
          sharing this agent as a template.
        </p>
        {/* Options Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {options.map((option, index) => (
            <Button
              key={index}
              className="!rounded-md !text-sm !py-2 !px-4 shadow-sm"
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfigureTemplateSettings;
