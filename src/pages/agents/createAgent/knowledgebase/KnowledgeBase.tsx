import { useState } from "react";
import { Menu, Dropdown, Input, Button } from "antd";
import { DeleteOutlineOutlined, MoreOutlined } from "@mui/icons-material";
import TextArea from "antd/es/input/TextArea";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux";
import { setCreateAgent } from "../../../../redux/agents/action";
import { Knowledge } from "../../../../redux/agents/store";

const KnowledgeBase = () => {
  const [selectedmenu, setMenu] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const menu = (
    <Menu className="bg-gray-900 shadow-lg rounded-md">
      <Menu.Item
        key="1"
        onClick={() => {
          setMenu("text");
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
      <Menu.Item
        key="4"
        onClick={() => {
          setMenu("integration");
          setInputValue("");
        }}
      >
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
  const [output, setOutput] = useState("");
  const createAgent = useSelector((state: RootState) => state.agents.agent);
  const dispatch = useDispatch();
  const [name,setName]=useState("")
  const deleteKnowledge = (name: string,inputType:string) => {
    dispatch(
      setCreateAgent({
        ...createAgent,
        knowledgeList: (createAgent.knowledgeList || []).filter(
          (knowledge) => knowledge.name !== name || knowledge.inputType!==inputType
        ),
      })
    );
  };
  const handleSubmit = async () => {
    if (agentId == undefined) {
      const payload: Knowledge = {
        inputData:inputValue,
        inputType: selectedmenu,
        name: name,
        agentId:createAgent.id
      };

      dispatch(
        setCreateAgent({
          ...createAgent,
          knowledgeList: [...(createAgent.knowledgeList || []), payload],
        })
      );
      setMenu("")
      setName("")
      return;
    }
    // setLoading(true);
    // const payload = {
    //   inputData: inputValue,
    //   inputType: selectedmenu,
    //   agentId: agentId,
    // };
    // const url = process.env.REACT_APP_API_URL + "/api/v1/knowledge";

    // const response = await fetch(url, {
    //   method: selectedmenu == "Query" ? "PUT" : "POST",
    //   headers: {
    //     Authorization: "Bearer " + localStorage.getItem("token"),
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(payload),
    // });
    // if (response.ok) {
    //   message.success("Successfully uploaded!");
    // }
    // setLoading(false);
  };
  const isDarkMode = localStorage.getItem("darkmode") === "true";
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
        <div className="flex justify-between items-center p-4">
          <p
            className="text-xl  text-white hover:cursor-pointer"
            onClick={() => setMenu("")}
          >
            Your Tables
          </p>
          <Dropdown overlay={menu} trigger={["click"]}>
            <button className=" px-4 py-2 bg-gray-800 hover:text-white rounded-md hover:bg-gray-700">
              Add New Table
            </button>
          </Dropdown>
        </div>

        {selectedmenu == "" && (
          <div className="bg-white shadow-sm rounded-lg">
            { (createAgent.knowledgeList ==null || createAgent.knowledgeList.length == 0) && <div className="flex justify-center">
                No Knowledge Base Added yet!
                </div>
                }
            {createAgent.knowledgeList && createAgent.knowledgeList.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-2 py-2 border-b last:border-none hover:bg-gray-800 cursor-pointer"
              >
                <div className="p-1 ml-1 flex space-x-1 items-center">
               
                  <h3 className="text-gray-800 text-sm">{item.name}</h3>
                </div>
                <div className="flex space-x-3">
                  <p className="text-gray-500 text-xs">{item.inputType}</p>
                  <DeleteOutlineOutlined onClick={()=>deleteKnowledge(item.name,item.inputType)} />
                  <MoreOutlined/>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedmenu!="" &&  <Input
            placeholder="Enter table name"
            value={name}
            className="bg-gray-200 mt-2 mb-4"
            onChange={(e) => setName(e.target.value)}
          />}

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
        {selectedmenu != "" && inputValue != "" && name!="" && (
          <p className="flex p-2 justify-end">
            {" "}
            <Button
              type="primary"
              onClick={() => handleSubmit()}
              disabled={loading}
            >
              Add
            </Button>
          </p>
        )}
      </div>
    </div>
  );
};

export default KnowledgeBase;
