import { VerifiedUserOutlined } from "@mui/icons-material";
import { Avatar, Card, Skeleton } from "antd";
import Meta from "antd/es/card/Meta";
import image2 from "../../assets/Aatar(1).png";
import image3 from "../../assets/Aatar(2).png";
import image4 from "../../assets/Aatar(3).png";
import { useEffect, useState } from "react";
import { SubscriptionPopup } from "../subscription/SubscriptionPage";

const AgentTemplates = () => {
  const [templates,setTemplates]=useState([])
  const [loading, setLoading] = useState(false);
  const [agentId,setAgentId]=useState()
  const [subscriptionVisible,setSubscriptionVisible]=useState(false)
  useEffect(()=>{
    setLoading(true)
    const fetchTemplates = async()=>{
      const url =process.env.REACT_APP_API_URL +"/api/v1/template/all"
      const response = await fetch(url,{
        method:'GET',
        headers:{
          Authorization:"Bearer "+ localStorage.getItem('token')
        }
      })
      if(response.ok){
        const data = await response.json()
        setTemplates(data.data)
      }
      setLoading(false)
    }
    fetchTemplates()
  },[])
  if (loading) {
    return (
      <div className="mb-10">
        <span className="text-xl font-medium ml-1">Agent Templates</span>
        <div className="grid grid-cols-3 gap-4 mt-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="shadow-md ">
              <Skeleton avatar paragraph={{ rows: 2 }} active />
            </Card>
          ))}
        </div>
      </div>
    );
  }


  return (
    <div className="mb-10 ">
      <span className="text-xl font-medium ml-1">Agent Templates</span>

      <div className="grid grid-cols-3 gap-4 mt-2  ">
        {templates.map((template, index) => (
          <Card
            key={index}
            className="shadow-md "
            hoverable
            actions={[<span key="clone" onClick={()=>{
              setSubscriptionVisible(true);
              setAgentId(template.id)
            }}>Clone</span>]}
          >
            <Meta
              avatar={<Avatar icon={<VerifiedUserOutlined />} src={image3} size={48}/>}
              title={template.name}
              description={`version:${template.version} - $ ${template.price} price`}
            />
         
         {subscriptionVisible && <SubscriptionPopup agentId={agentId} visible={subscriptionVisible} setVisible={setSubscriptionVisible}/>}

          </Card>
        ))}
      </div>
    </div>
  );
};

export default AgentTemplates;
