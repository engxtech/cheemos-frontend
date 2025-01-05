import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import {
  DeleteOutline,
  DeleteOutlined,
  DeleteOutlineRounded,
  EditOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { setCreateAgent } from "../../redux/agents/action";
import { useNavigate } from "react-router-dom";

const ConfigureTemplateSettings = () => {
  // const [customProperties, setCustomProperties] = useState<Record<string, any>>({});
  const createAgent = useSelector((state: RootState) => state.agents.agent);
  const customProperties: Record<string, any> = useSelector(
    (state: RootState) => state.agents.agent?.customProperties || {}
  );
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const dispatch = useDispatch();
  const isDarkMode = localStorage.getItem("darkmode") === "true";

  const handleOpenModal = (key = "", value = "", editing = false) => {
    setSelectedKey(key);
    setSelectedValue(value);
    setEditingKey(editing ? key : null);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (selectedKey) {
      dispatch(
        setCreateAgent({
          ...createAgent,
          customProperties: {
            ...customProperties,
            [selectedKey]: selectedValue,
          },
        })
      );
      // setCustomProperties((prev) => ({
      //   ...prev,
      //   [selectedKey]: selectedValue,
      // }));
    }
    setIsModalOpen(false);
    setSelectedKey("");
    setSelectedValue("");
  };

  const handleDelete = (key: string) => {
    setCreateAgent({
      ...createAgent,
      customProperties: {
        ...customProperties,
        [selectedKey]: selectedValue,
      },
    });
    //remove key from createAgent custom properites
    setCreateAgent({
      ...createAgent,
      customProperties: Object.fromEntries(
        Object.entries(customProperties).filter(([k, v]) => k !== key)
      ),
    });

    // setCustomProperties((prev) => {
    //   const updated = { ...prev };
    //   delete updated[key];
    //   return updated;
    // });
  };

  const options = [
    "Text input",
    "Long text input",
    // "Options dropdown",
    "Numeric input",
    // "Checkbox",
    // "Text list",
    "JSON",
    // "List of JSONs",
    // "File to text",
    // "File to URL",
    // "Multiple files to URLs",
    // "Table",
    "API key input",
    // "OAuth account",
    // "Tool approval",
  ];
  
  return (
    <div
      className={`sm:border border-gray-500  p-4 flex justify-center items-start sm:h-[97vh] w-full ${
        isDarkMode ? "bg-gray-100 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`${
          isDarkMode ? "bg-gray-100" : "bg-white"
        } rounded-lg shadow-sm p-4 w-full sm:max-w-5xl`}
      >
        {/* Title */}
        <h2 className="text-2xl font-semibold mb-4">
          Configure template settings
        </h2>
        <p className="text-sm mb-6">
          Set up custom properties that can be re-used across your agent
          (accessible via ). Particularly useful for abstracting inputs for
          sharing this agent as a template.
        </p>

        {/* Options Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {options.map((option, index) => (
            <Button
              key={index}
              className="!rounded-md !text-sm !py-2 !px-4 shadow-sm"
              onClick={() => handleOpenModal(option, "")}
            >
              {option}
            </Button>
          ))}
        </div>

        {/* Display Custom Properties */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Custom Properties</h3>
          <div className="mt-2 space-y-4 sm:h-[40vh] h-[30vh] overflow-scroll scroll">
            {Object.entries(customProperties).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between items-center p-2 bg-gray-100 rounded-md "
              >
                <div className="">
                  <strong>{key}</strong>: {value.length > 20 ? value.substring(0, 20) + ".." : value}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="small"
                    onClick={() => handleOpenModal(key, value, true)}
                    className="px-1 py-1"
                  >
                    <EditOutlined />
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleDelete(key)}
                    className="px-1 py-1"
                  >
                    <DeleteOutlined />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 flex  justify-center space-x-2 border-t border-gray-500 ">
          <Button
            type="primary"
            className="bg-blue-500"
            onClick={() => navigate("../tools")}
          >
            Prev
          </Button>
         
        </div>
      </div>

      {/* Modal for Editing/Adding */}
      <Modal
        title={editingKey ? "Edit Variable" : "Add Variable"}
        visible={isModalOpen}
        onOk={handleSave}
        onCancel={() => setIsModalOpen(false)}
        okText="Save"
        cancelText="Cancel"
        className="bg-gray-100"
      >
        <div className="mb-4">
          <label className="block mb-2 font-medium"> Key</label>
          <Input
            placeholder="Enter key"
            value={selectedKey}
            onChange={(e) => setSelectedKey(e.target.value)}
            className="!rounded-md !text-sm !py-2 !px-4"
            disabled={!!editingKey}
          />
        </div>
        <div>
          <label className="block mb-2 font-medium"> Value</label>
          <Input
            placeholder="Enter value"
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
            className="!rounded-md !text-sm !py-2 !px-4"
          />
        </div>
      </Modal>
    </div>
  );
};

export default ConfigureTemplateSettings;
