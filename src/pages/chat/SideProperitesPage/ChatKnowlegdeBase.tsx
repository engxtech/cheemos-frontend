import { useEffect, useState } from "react";
import { Menu, Dropdown, Input, Button, message, Tooltip } from "antd";
import {
  AddCardOutlined,
  AddOutlined,
  CloseOutlined,
  DeleteOutlineOutlined,
  MoreOutlined,
  NavigateNextOutlined,
} from "@mui/icons-material";
import TextArea from "antd/es/input/TextArea";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { setCreateAgent, setRefresh } from "../../../redux/agents/action";

const YourTablesPopup = ({ visible, setVisible }) => {
  const [selectedmenu, setMenu] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const menu = (
    <Menu className="bg-gray-900 shadow-lg rounded-md">
      <Menu.Item
        key="1"
        onClick={() => {
          setMenu("text");
          setOutput("");
          setInputValue("");
        }}
      >
        <div className="px-3 py-2 hover:bg-gray-800 cursor-pointer rounded-md">
          <strong className="text-gray-200 text-sm">Blank</strong>
          <p className="text-gray-400 text-xs">
            You can add simple texts and paragraphs
          </p>
        </div>
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => {
          setMenu("pdf_url");
          setOutput("");
          setInputValue("");
        }}
      >
        <div className="px-3 py-2 hover:bg-gray-800 cursor-pointer rounded-md">
          <strong className="text-gray-200 text-sm">Upload file</strong>
          <p className="text-gray-400 text-xs">
            CSV, Excel, JSON, PDF or Audio
          </p>
        </div>
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={() => {
          setMenu("html");
          setOutput("");
          setInputValue("");
        }}
      >
        <div className="px-3 py-2 hover:bg-gray-800 cursor-pointer rounded-md">
          <strong className="text-gray-200 text-sm">Import from website</strong>
          <p className="text-gray-400 text-xs">
            Extract content from a website
          </p>
        </div>
      </Menu.Item>
      <Menu.Item key="4">
        <div className="px-3 py-2 hover:bg-gray-800 cursor-pointer rounded-md">
          <strong className="text-gray-200 text-sm">Integrations</strong>
          <p className="text-gray-400 text-xs">
            Import data from a third party
          </p>
        </div>
      </Menu.Item>
    </Menu>
  );
  const agentId = useParams().agentId;
  const [name, setName] = useState("");
  const [output, setOutput] = useState("");
  const createAgent = useSelector((state: RootState) => state.agents.agent);
  const [refresh, setRefresh] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      inputData: inputValue,
      inputType: selectedmenu,
      agentId: agentId,
      name: name,
    };
    const url = process.env.REACT_APP_API_URL + "/api/v1/knowledge";

    const response = await fetch(url, {
      method: selectedmenu == "Query" ? "PUT" : "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      const data = await response.json(); // 2 spaces for indentation
      if (selectedmenu == "Query") {
        setOutput(data.data);
      } else {
        setMenu("");
      }
    }
    setRefresh(!refresh);
    setLoading(false);
  };
  const dispatch = useDispatch();
  const editAgent = async () => {
    const url = process.env.REACT_APP_API_URL + `/api/v1/agent/${agentId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    const agent = data.data;
    const ids = agent.toolsList.map((tool) => tool.id);
    // call that api and set the value then!
    dispatch(
      setCreateAgent({
        ...createAgent,
        name: agent.name,
        id: agent.id,
        iconName: agent.iconName,
        customProperties: agent.customProperties,
        toolsList: ids,
        toolsListCore: agent.toolsList,
        description: agent.description,
        welcomeMessage: agent.welcomeMessage,
        agentGuideText: agent.agentGuideText,
        temperature: agent.temperature,
        coreInstructions: {
          _SYSTEM_CORE_INSTRUCTIONS_PROMPT:
            agent.coreInstructions?._SYSTEM_CORE_INSTRUCTIONS_PROMPT?.content,
        },
        knowledgeList: agent.knowledgeList,
        toolRetries: 3,
      })
    );
  };
  const deleteKnowledge = async (knowledge) => {
    const url = process.env.REACT_APP_API_URL + `/api/v1/knowledge`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type":"application/json"
      },
      body: JSON.stringify(knowledge)
    });

    if(response.ok){
      message.success("Successfully deleted!")
      setRefresh(!refresh)
    }
  };



  useEffect(() => {
    editAgent();
  }, [refresh]);
  return (
    visible && (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
        <div className="bg-gray-900 px-4 py-4 rounded-lg shadow-lg  sm:w-[60%] w-[95%] min-h-[53vh]">
          <div className="flex justify-between items-center p-4">
            <p
              className="sm:text-xl  text-white "
              onClick={() => {
                setMenu("");
                setOutput("");
              }}
            >
              Your Tables
            </p>
            <Dropdown overlay={menu} trigger={["click"]}>
              <button className=" px-4 py-2 bg-gray-800 hover:text-white rounded-md hover:bg-gray-700">
                <AddCardOutlined className="text-sm"/> Table
              </button>
            </Dropdown>
            <button
              className=" px-4 ml-4 py-2 bg-gray-800 hover:text-white rounded-md hover:bg-gray-700"
              onClick={() => {
                setMenu("Query");
                setOutput("");
                setInputValue("");
              }}
            >
              Test Knowledge
            </button>
            <button
              onClick={() => setVisible(false)}
              className=" px-4 py-2 text-white rounded-md hover:cursor-pointer"
            >
              <CloseOutlined />
            </button>
          </div>

          {selectedmenu == "" && (
            <div className="bg-white shadow-sm rounded-lg px-3  py-2 h-[40vh] overflow-auto scroll">
              {(createAgent.knowledgeList == null ||
                createAgent.knowledgeList.length == 0 || createAgent.knowledgeList[0]==null) && (
                <div className="flex justify-center items-center h-[10vh]">
                  No Knowledge Base Added yet!
                </div>
              )}
              {createAgent.knowledgeList &&
                createAgent.knowledgeList.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-2 py-2 border-b mr-1 last:border-none hover:bg-gray-800 "
                  >
                    <div className="p-1 ml-1 flex space-x-1 items-center">
                      <h3 className="text-gray-800 text-[0.9rem]">{item.name}</h3>
                    </div>
                    <div className="flex space-x-6">
                      <p className="text-gray-500">{item.inputType}</p>
                      <DeleteOutlineOutlined
                        onClick={() =>
                          // deleteKnowledge(item)
                          message.info("This feature will be added soon!")
                        }
                        className="cursor-pointer border rounded-md"
                      />
                      <Tooltip title={item.inputData} placement="top">
                        <MoreOutlined className="cursor-pointer " />
                      </Tooltip>
                    </div>
                  </div>
                ))}
            </div>
          )}
          {selectedmenu != "" && selectedmenu != "Query" && (
            <Input
              placeholder="Enter table name"
              value={name}
              className="bg-gray-200 mt-2 mb-4"
              onChange={(e) => setName(e.target.value)}
            />
          )}
          {selectedmenu === "text" && (
            <TextArea
              placeholder="Enter knowledge text you wanna feed to your agent!"
              value={inputValue}
              rows={6}
              className="bg-gray-200"
              onChange={(e) => setInputValue(e.target.value)}
            />
          )}

          {selectedmenu === "pdf_url" && (
            <Input
              placeholder="Enter pdf url"
              value={inputValue}
              className="bg-gray-200"
              onChange={(e) => setInputValue(e.target.value)}
            />
          )}
          {selectedmenu === "html" && (
            <Input
              placeholder="Enter website url for crawiling!"
              value={inputValue}
              className="bg-gray-200"
              onChange={(e) => setInputValue(e.target.value)}
            />
          )}
          {selectedmenu === "Query" && (
            <Input
              placeholder="Enter your query here!"
              value={inputValue}
              className="bg-gray-200"
              onChange={(e) => setInputValue(e.target.value)}
            />
          )}
          {selectedmenu != "" && inputValue != "" && (name != "" || (selectedmenu =="Query")) && (
            <p className="flex p-2 justify-end">
              {" "}
              <Button
                type="primary"
                onClick={() => handleSubmit()}
                disabled={loading}
                style={{
                  backgroundColor: loading ? "#e6f7ff" : "",
                  color: loading ? "#0050b3" : "",
                  borderColor: loading ? "#91d5ff" : "",
                }}
              >
                {!loading ? "Upload" : "Uploading..."}
              </Button>
            </p>
          )}
          {output != "" && <div>{output}</div>}
        </div>
      </div>
    )
  );
};

export default YourTablesPopup;
