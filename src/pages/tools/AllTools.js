import { Card, Button, Pagination, Skeleton } from "antd";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import ToolHeader from "../../header/ToolsHeader";
import {
  CopyAllOutlined,
  DeleteOutlined,
  EmailOutlined,
  LinkedIn,
  PanToolOutlined,
  PictureAsPdfOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// const tools = [
//   {
//     title: "Read PDF",
//     description: "For Rosh Singh's Sales Research & Qualifier Agent.",
//     icon: <PictureAsPdfOutlined />,
//   },

//   {
//     title: "Get LinkedIn Company breakdown",
//     description:
//       "Use this to get a breakdown of total number of jobs and employ...",
//     icon: <LinkedIn />,
//   },
//   {
//     title: "Long SEO Optimized Blog Writer",
//     description: "For Scott's SEO & Growth Marketing agent.",
//     icon: <PictureAsPdfOutlined />,
//   },
//   {
//     title: "Google search",
//     description: "For Rosh Singh's Sales Research & Qualifier Agent.",
//     icon: <SearchOutlined />,
//   },
//   {
//     title: "Get LinkedIn company posts",
//     description: "For Rosh Singh's Sales Research & Qualifier Agent.",
//     icon: <LinkedIn />,
//   },
//   {
//     title: "Create email sequence",
//     description: "For Rosh Singh's Sales Research & Qualifier Agent.",
//     icon: <EmailOutlined />,
//   },
// ];


const ToolCard = ({ title, description, icon }) => (
  <Card
    className="w-full md:w-[32%] lg:w-[32%]  border-gray-300 shadow-md rounded-lg"
    actions={[
      <div className="flex space-x-4 px-4 justify-between">
        <div className="space-x-2 px-2">
          <Button key="edit">
            <DeleteOutlined />
          </Button>
          <Button key="edit">
            <CopyAllOutlined />
          </Button>
        </div>

        <div className="space-x-2 px-2">
          <Button key="edit">Edit</Button>
          <Button
            type="primary"
            key="use"
            // onClick={() => navigate(`./${agent.id}`)}
          >
            Use Tool {">"}
          </Button>
        </div>
      </div>,
    ]}
  >
    <div className="flex space-x-2 items-baseline ">
      {" "}
      <p className="text-gray-500 text-sm mt-2 border shadow-md p-1 rounded-md">
        {icon}
      </p>
      <h3 className="font-semibold text-lg">{title}</h3>
    </div>
    <p className="text-gray-500 text-sm mt-2 h-[7vh]">{description}</p>
  </Card>
);

const ToolsGrid = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getAgents = async () => {
      const url = process.env.REACT_APP_API_URL + "/api/v1/tools/all";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setTools(data);
      setLoading(false);
    };
    getAgents();
  }, [refresh]);

  const navigate = useNavigate();
  if (loading) {
    return (
      <div>
        <ToolHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-50 px-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="shadow-md border rounded-lg  mt-4 ">
              <Skeleton avatar paragraph={{ rows: 3 }} active />
            </Card>
          ))}
        </div>
      </div>
    );
  }
  const handleDelete = async (id) => {
    const url = process.env.REACT_APP_API_URL + `/api/v1/agent/${id}`;
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
  return (
    <div className="bg-gray-100 h-screen">
      <ToolHeader />
      <div className="p-2 py-5">
        <div className="flex flex-wrap gap-5 ml-4">
          {tools.map((tool, index) => (
            <ToolCard
              key={index}
              title={tool.name}
              description={tool.description}
              icon={<PanToolOutlined/>}
            />
          ))}
        </div>
        <div className="flex justify-end mt-6">
          <Pagination defaultCurrent={1} total={20} />
        </div>
      </div>
    </div>
  );
};

export default ToolsGrid;
