import React from "react";
import { Table } from "antd";
import KnowledgeHeader from "../../header/KnowledgeHeader";
import { NavigateNextOutlined } from "@mui/icons-material";

const Knowledge = () => {
  // Table Data
  const data = [
    {
      key: "1",
      name: "agent_feedback_cd47c2e4-598f-4883-adae-c3e47fb026f1",
      documents: "2 documents",
    },
    {
      key: "2",
      name: "cv_abhishek_kumar_pdf",
      documents: "1 document",
    },
  ];


  return (
    <div className="bg-black h-[100vh]">
      <KnowledgeHeader />
      <div  className="flex-1 overflow-y-auto p-8 bg-black" >
        <h2 className="text-xl font-semibold mb-4">Your Tables</h2>
        <div className="bg-white shadow-sm rounded-lg">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-2 py-2 border-b last:border-none hover:bg-gray-800 cursor-pointer"
            >
              <div className="p-1 ml-1 flex space-x-1 items-center">
               <h3 className=" text-sm">{item.icon}</h3>
                <h3 className="text-gray-800 text-sm">{item.name}</h3>
              </div>
              <div className="flex space-x-3">
              <p className="text-gray-500 text-xs">{item.connected}</p>
                <NavigateNextOutlined className="text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Knowledge;
