import React from "react";
import { Table } from "antd";
import KnowledgeHeader from "../../header/KnowledgeHeader";

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

  // Table Columns
  const columns = [
    {
      title: "Your Tables",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: "",
      dataIndex: "documents",
      key: "documents",
      render: (text) => <span className="text-gray-500">{text}</span>,
    },
  ];

  return (
    <div className="bg-gray-50">
    <KnowledgeHeader/>

    <div className="p-8">
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowClassName="hover:bg-gray-100 cursor-pointer"
      />
    </div>
    </div>
  );
};

export default Knowledge;
