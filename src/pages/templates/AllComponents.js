import React from "react";
import CategorySearch from "./CategorySearch";
import AgentTemplates from "./AgentTemplates";
import ToolTemplates from "./ToolTemplates";
import HeaderCards from "./CardsHeader";
import { TemplateHeader } from "../../header/TemplateHeader";

const AllTemplates = () => {
  return (
    // <div>
    //   <TemplateHeader />
    //   <div className="p-8">
    //     <HeaderCards />
    //     <CategorySearch />
    //     <AgentTemplates />
    //     <ToolTemplates />
    //   </div>
    // </div>
    <div className="flex flex-col h-screen">
  {/* Fixed Header */}
  <div className="fixed top-0 left-0 right-0 z-10 bg-white shadow">
    <TemplateHeader />
  </div>

  {/* Scrollable Content */}
  <div className="flex-1 overflow-y-auto p-8" style={{ paddingTop: "84px" }}>
    <HeaderCards />
    <CategorySearch />
    <AgentTemplates />
    <ToolTemplates />
  </div>
</div>

  );
};

export default AllTemplates;
