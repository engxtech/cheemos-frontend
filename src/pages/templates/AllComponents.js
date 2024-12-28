import React from "react";
import CategorySearch from "./CategorySearch";
import AgentTemplates from "./AgentTemplates";
import ToolTemplates from "./ToolTemplates";
import HeaderCards from "./TopAgents";
import { TemplateHeader } from "../../header/TemplateHeader";

const AllTemplates = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white shadow">
        <TemplateHeader />
      </div>
      <div
        className="flex-1 overflow-y-auto p-8 py-24"
      >
        <HeaderCards />
        <CategorySearch />
        <AgentTemplates />
        <ToolTemplates />
      </div>
    </div>
  );
};

export default AllTemplates;
