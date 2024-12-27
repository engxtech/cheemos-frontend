import { CopyAllOutlined, PanToolOutlined, PanToolRounded, VerifiedUserOutlined } from "@mui/icons-material";
import { Avatar, Button, Card, message, Skeleton } from "antd";
import { FaTools } from "react-icons/fa";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";
const ToolTemplates = () => {
  const [price, setPrice] = useState(0);

  const [agentId, setAgentId] = useState(null);
  const [subscriptionVisible, setSubscriptionVisible] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const fetchTemplates = async () => {
      const url = process.env.REACT_APP_API_URL + "/api/v1/tools/all";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTemplates(data);
      }
      setLoading(false);
    };
    fetchTemplates();
  }, []);

  if (loading) {
    return (
      <div className="mb-10">
        <span className="text-xl font-medium ml-1">Top Agents</span>
        <div className="grid sm:grid-cols-4 grid-cols-1 gap-4 mt-2">
        {Array.from({ length: 6 }).map((_, index) => (
            <Card
            key={index}
            className="sm:w-[23vw] w-[100vw] h-50 bg-gray-900"
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

  return (
    <div className="mb-10 ">
      <span className="text-xl font-medium ml-1">All Tools</span>
      <div className="grid sm:grid-cols-4 grid-cols-1  gap-4 mt-2  ">
        {templates.map((card, index) => (
          <Card
            key={index}
            className={` sm:w-[21vw]w-[100vw] h-50 bg-gray-900 `}
            hoverable
            actions={[]}
          >
            <Meta
              avatar={<Avatar icon={<FaTools />} size={48} />}
              title={<span className="text-gray-300">{card.name}</span>}
              description={
                <div className="h-[8vh] text-gray-300">
                  {card.description.length > 50
                    ? `${card.description.substring(0, 40)}...`
                    : card.description}
                </div>
              }
            />
            <hr></hr>
            <div className="  rounded-lg p-2 flex justify-end items-center px-4">
              <Button
                icon={<CopyAllOutlined />}
                className="text-gray-500 ml-3 text-[0.9rem]"
                onClick={()=>message.info("Feature to clone tool will be available soon!")}
              >
                Clone
              </Button>{" "}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ToolTemplates;



