import {
  Card,
  Button,
  Pagination,
  Skeleton,
  message,
  Avatar,
  Tooltip,
} from "antd";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import ToolHeader from "../../header/ToolsHeader";
import {
  CopyAllOutlined,
  DeleteOutlined,
  EmailOutlined,
  InfoOutlined,
  LinkedIn,
  PanToolOutlined,
  PictureAsPdfOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Meta from "antd/es/card/Meta";
import { FaTools } from "react-icons/fa";
import EmptyContent from "../../components/zeroContent";

const ToolCard = ({
  id,
  tool,
  title,
  description,
  icon,
  handleDelete,
  navigate,
}) => (
  <Card className="sm:w-[21vw]w-[100vw] h-50 bg-gray-900 ">
    <Meta
      avatar={<Avatar icon={<FaTools />} size={60} />}
      title={
        <span className="text-gray-300 flex justify-between">
          {tool.name}
          <Tooltip
            // title={detailedInfo(tool)}
            overlayClassName="custom-tooltip"
          >
            <InfoOutlined className="ml-2 cursor-pointer text-gray-400 hover:text-gray-200" />
          </Tooltip>
        </span>
      }
      description={
        <div className="h-[10vh] text-gray-300">
          {tool.description.length > 50
            ? `${tool.description.substring(0, 50)}...`
            : tool.description}
        </div>
      }
    />
    <hr></hr>
    <div className="rounded-lg p-2 flex justify-between items-center">
      <div className="space-x-1">
        <Button
          key="delete"
          className="px-1 py-1"
          // onClick={() => handleDelete(agent.id)}
        >
          <DeleteOutlined />
        </Button>
        <Button
          key="copy"
          onClick={() =>
            message.info("This feature to copy will be enabled soon!")
          }
          className="px-1 py-1"
        >
          <CopyAllOutlined />
        </Button>
      </div>

      <div className="space-x-1 flex items-center">
        <Button
          key="edit"
          onClick={() =>
            message.info("This feature to edit tool will be enabled soon!")
          }
          icon={<EditOutlined />}
        ></Button>
        <Button type="primary" key="use" onClick={() => navigate(`./${id}`)}>
          Use {">"}
        </Button>
      </div>
    </div>
  </Card>
);

const ToolsGrid = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const getAgents = async () => {
      try{
        const url = process.env.REACT_APP_API_URL + "/api/v1/tools/user";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if(data)setTools(data);
      setLoading(false);
    }
    catch(e){
      console.log(e);
    }
    };
    getAgents();
  }, [refresh]);

  const handleDelete = async (id) => {
    const url = process.env.REACT_APP_API_URL + `/api/v1/tools/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (response.ok) {
      setRefresh(!refresh);
    }
  };
  if (loading) {
    return (
      <div className="mb-10 fixed top-0 left-0 right-0 z-10">
        <ToolHeader />
        <div className="grid sm:grid-cols-4 grid-cols-1 gap-4 px-4 py-4 mt-2 bg-black">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card
              key={index}
              className="sm:w-[23vw] w-[90vw] h-50 bg-gray-900"
              hoverable
            >
              <Skeleton
                avatar
                paragraph={{ rows: 5 }}
                active
                title={false}
                className="h-full"
              />
            </Card>
          ))}
        </div>
      </div>
    );
  }
  if (tools.length === 0) {
    return (
      <div className="bg-black h-screen fixed top-0 left-0 right-0 z-10">
        <ToolHeader />
        <EmptyContent message="No Tools Found" />
      </div>
    );
  }

  return (
    <div className="bg-black h-screen fixed top-0 left-0 right-0 z-10">
      <ToolHeader />
      <div className="bg-black flex-1 overflow-y-auto p-4">
        <div className="grid sm:grid-cols-4 grid-cols-1  gap-4 mt-2 overflow-auto scroll">
          {tools.map((tool, index) => (
            <ToolCard
              id={tool.id}
              tool={tool}
              key={index}
              title={tool.name}
              description={tool.description}
              icon={<PanToolOutlined />}
              handleDelete={handleDelete}
              navigate={navigate}
            />
          ))}
        </div>
        {/* <div className="flex justify-end mt-6">
          <Pagination defaultCurrent={1} total={20} />
        </div> */}
      </div>
    </div>
  );
};

export default ToolsGrid;
