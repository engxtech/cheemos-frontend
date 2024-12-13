import { PanToolOutlined, PanToolRounded, VerifiedUserOutlined } from "@mui/icons-material";
import { Avatar, Card } from "antd";
import { FaTools } from "react-icons/fa";
import Meta from "antd/es/card/Meta";
const ToolTemplates = () => {
  const templates = [
    { name: "PDF Reader", creator: "Vivek Upreti", downloads: 361 },
    { name: "Automation Script Generator", creator: "Vivek Upreti", downloads: 849 },
    { name: "Test Case Generator", creator: "Vivek Upreti", downloads: 176 },
    // Add more templates as needed
  ];

  return (
    <div>
      <span className="text-xl font-medium ml-1">Tool Templates</span>

      <div className="grid grid-cols-3 gap-4 mt-2">
        {templates.map((template, index) => (
          <Card
            key={index}
            className="shadow-md"
            hoverable
            actions={[<span key="clone">Clone</span>]}
          >
            <Meta
              avatar={<Avatar icon={<FaTools />} size={48} />}
              title={template.name}
              description={`${template.creator} - ${template.downloads} downloads`}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ToolTemplates;
