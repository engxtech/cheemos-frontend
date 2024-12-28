import React, { useEffect, useState } from "react";
import { Card, Avatar, Button, Skeleton, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  CopyAllOutlined,
  InfoOutlined,
  VerifiedUserOutlined,
} from "@mui/icons-material";
import image1 from "../../assets/Aatar.png";
import image2 from "../../assets/Aatar(1).png";
import image3 from "../../assets/Aatar(2).png";
import image4 from "../../assets/Aatar(3).png";
import image5 from "../../assets/Aatar(4).png";
import { SubscriptionPopup } from "../subscription/SubscriptionPage";

const { Meta } = Card;

export const HeaderCards = () => {
  const [price, setPrice] = useState(0);

  const [agentId, setAgentId] = useState(null);
  const [subscriptionVisible, setSubscriptionVisible] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const images = [image1, image2, image3, image4, image5];

  function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }

  useEffect(() => {
    setLoading(true);
    const fetchTemplates = async () => {
      const url = process.env.REACT_APP_API_URL + "/api/v1/template/all/hot";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setTemplates(data.data);
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
  const detailedInfo =(card)=> (
    <div className="bg-gray-900 text-gray-200 p-1 rounded-md text-xs shadow-lg">
      <p>tools:+ 4</p>
      <p className="space-x-2">Version: {card.version}</p>
      <p>Last Updated: 29 May</p>
      {/* Add more details as needed */}
    </div>
  );
  return (
    <div className="mb-10 ">
      <span className="text-xl font-medium ml-1">Top Agents</span>
      <div className="grid sm:grid-cols-4 grid-cols-1  gap-4 mt-2  ">
        {templates.map((card, index) => (
          <Card
            key={index}
            className={` sm:w-[21vw]w-[100vw] h-50 bg-gray-900 `}
            hoverable
            actions={[]}
          >
            <Meta
              avatar={<Avatar src={getRandomImage()} size={75} />}
              title={
                <span className="text-gray-300 flex justify-between">
                  {card.name}{" "}
                  <Tooltip
                    title={detailedInfo(card)}
                    overlayClassName="custom-tooltip"
                  >
                    <InfoOutlined className="ml-2 cursor-pointer text-gray-400 hover:text-gray-200" />
                  </Tooltip>
                </span>
              }
              description={
                <div className="h-[10vh] text-gray-300">
                  {card.description.length > 50
                    ? `${card.description.substring(0, 50)}...`
                    : card.description}
                </div>
              }
            />
            <hr></hr>
            <div className="  rounded-lg p-2 flex justify-between items-center px-4">
              {" "}
              <p className="ml-2 mr-2 text-blue-500">
                {card.price == 0 ? "FREE" : ` $${card.price} price `}
              </p>
              <Button
                icon={<CopyAllOutlined />}
                className="text-gray-500 ml-3 text-[0.9rem]"
                onClick={() => {
                  setSubscriptionVisible(true);
                  setAgentId(card.id);
                  setPrice(Number(card.price));
                }}
              >
                Hire
              </Button>{" "}
            </div>
            {subscriptionVisible && (
              <SubscriptionPopup
                price={price}
                agentId={agentId}
                visible={subscriptionVisible}
                setVisible={setSubscriptionVisible}
              />
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HeaderCards;
