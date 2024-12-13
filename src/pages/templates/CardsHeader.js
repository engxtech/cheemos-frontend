import React, { useState } from "react";
import { Card, Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { CopyAllOutlined, VerifiedUserOutlined } from "@mui/icons-material";
import image1 from "../../assets/Aatar.png";
import image2 from "../../assets/Aatar(1).png";
import image3 from "../../assets/Aatar(2).png";
import image4 from "../../assets/Aatar(3).png";
import image5 from "../../assets/Aatar(4).png";
import { SubscriptionPopup } from "../subscription/SubscriptionPage";

const { Meta } = Card;

export const HeaderCards = () => {
  const cards = [
    {
      id:1,
      title: "Payment Tester",
      role: "Sizuka, Lead QA",
      tools: "+ 4 tools",
      color: "bg-yellow-50",
      img:image1
    },
    {
      id:2,
      title: "Casual Game Tester",
      role: "Alice, QA II",
      tools: "+ 5 tools",
      color: "bg-pink-50",
      img:image2
    },
    {
      id:3,
      title: "E-commerce Exploratory QA",
      role: "Rosh, Exploratory QA",
      tools: "+ 5 tools",
      color: "bg-orange-50",
      img:image3
    },
    {
      id:4,
      title: "Release Manager",
      role: "Rio, Release Manager",
      tools: "+ 3 tools",
      color: "bg-purple-50",
      img:image4
    },
    {
      id:5,
      title: "Automation Engineer 1",
      role: "Scott, SDET 1",
      tools: "+ 1 tool",
      color: "bg-blue-50",
      img:image5
    },
    {
      id:6,
      title: "Profile QA",
      role: "Varisu, QA 1",
      tools: "+ 1 tool",
      color: "bg-green-50",
      img:image3
    },
  ];

  const [agentId,setAgentId]=useState(null)
  const [subscriptionVisible,setSubscriptionVisible]=useState(false)
  return (
    <div className="flex flex-wrap gap-12 p-1 ">
      {cards.map((card, index) => (
        <Card
          key={index}
          className={`w-[21vw] h-50 ${card.color} shadow-md`}
          hoverable
          actions={[<div className="flex justify-end items-center px-2"> <p className="text-blue-500">{card.tools}</p>
           <Button  icon={<CopyAllOutlined/>} 
           className="text-gray-500 ml-3 text-[0.9rem]"
           onClick={
            ()=>{
              setSubscriptionVisible(true);
              setAgentId(card.id)
            }
          }
           >Hire</Button> </div>]}
        >
          <Meta
            avatar={<Avatar src={card.img}  size={60} />}
            title={card.title}
            description={<div className="h-[7vh]">{card.role}</div>}
          />
          {subscriptionVisible && <SubscriptionPopup agentId={agentId} visible={subscriptionVisible} setVisible={setSubscriptionVisible}/>}
        </Card>
      ))}
    </div>
  );
};

export default HeaderCards;
