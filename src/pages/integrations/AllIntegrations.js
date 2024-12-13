import React from "react";
import IntegrationHeader from "../../header/IntegrationHeader";
import { LinkedIn, NavigateNextOutlined, OutletTwoTone, TurnRight } from "@mui/icons-material";

const integrations = [
  { name: "Google (Gmail, Calendar & API)", connected: "1 connected account",icon:<LinkedIn/> },
  { name: "Microsoft & Outlook", connected: "0 connected accounts",icon:<OutletTwoTone/> },
  { name: "Salesforce", connected: "0 connected accounts",icon:<LinkedIn/>  },
  { name: "Slack", connected: "0 connected accounts" ,icon:<LinkedIn/> },
  { name: "Zendesk", connected: "0 connected accounts",icon:<LinkedIn/>  },
  { name: "HubSpot", connected: "0 connected accounts",icon:<LinkedIn/>  },
  { name: "Linear", connected: "0 connected accounts" ,icon:<LinkedIn/> },
  { name: "Outreach", connected: "0 connected accounts",icon:<LinkedIn/>  },
  { name: "Zoom", connected: "0 connected accounts" ,icon:<LinkedIn/> },
  { name: "LinkedIn", connected: "0 connected accounts",icon:<LinkedIn/>  },
  { name: "WhatsApp", connected: "0 connected accounts",icon:<LinkedIn/>  },
  { name: "Zoho CRM", connected: "0 connected accounts",icon:<LinkedIn/>  },
];

const IntegrationList = () => {
  return (
    <div className="flex flex-col h-screen">
       <div className="fixed top-0 left-0 right-0 z-10 bg-white shadow">
       <IntegrationHeader />
       </div>

      <div  className="flex-1 overflow-y-auto p-8 bg-gray-50" style={{ paddingTop: "84px" }}>
        <h2 className="text-xl font-semibold mb-4">Connect your integrations</h2>
        <div className="bg-white shadow-sm rounded-lg">
          {integrations.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-2 py-2 border-b last:border-none hover:bg-gray-100 cursor-pointer"
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

export default IntegrationList;
