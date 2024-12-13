import { Card, Button, Pagination } from "antd";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import ToolHeader from "../../header/ToolsHeader";
import {
  CopyAllOutlined,
  DeleteOutlined,
  EmailOutlined,
  LinkedIn,
  PictureAsPdfOutlined,
  SearchOutlined,
} from "@mui/icons-material";

const tools = [
  {
    title: "Read PDF",
    description: "For Rosh Singh's Sales Research & Qualifier Agent.",
    icon: <PictureAsPdfOutlined />,
  },

  {
    title: "Get LinkedIn Company breakdown",
    description:
      "Use this to get a breakdown of total number of jobs and employ...",
    icon: <LinkedIn />,
  },
  {
    title: "Long SEO Optimized Blog Writer",
    description: "For Scott's SEO & Growth Marketing agent.",
    icon: <PictureAsPdfOutlined />,
  },
  {
    title: "Google search",
    description: "For Rosh Singh's Sales Research & Qualifier Agent.",
    icon: <SearchOutlined />,
  },
  {
    title: "Get LinkedIn company posts",
    description: "For Rosh Singh's Sales Research & Qualifier Agent.",
    icon: <LinkedIn />,
  },
  {
    title: "Create email sequence",
    description: "For Rosh Singh's Sales Research & Qualifier Agent.",
    icon: <EmailOutlined />,
  },
];

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
  return (
    <div className="bg-gray-100 h-screen">
      <ToolHeader />
      <div className="p-2 py-5">
        <div className="flex flex-wrap gap-5 ml-4">
          {tools.map((tool, index) => (
            <ToolCard
              key={index}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
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
