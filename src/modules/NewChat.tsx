import React from "react";
import { Input, Button } from "antd";
import { SendOutlined } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";

const NewChat: React.FC = () => {
    const navigate = useNavigate()
    const agentId =useParams().agentId
    const handleFirstSend=async()=>{
      const url = process.env.REACT_APP_API_URL +`/api/v1/chat/new`
      const payload={
        agentId:agentId
      }
      const response = await fetch(url,{
        method:'POST',
        headers:{
            Authorization:"Bearer "+ localStorage.getItem('token'),
            "Content-Type":"application/json"
        },
        body:JSON.stringify(payload)
      })
      if(response.ok){
        const data = await response.json();
        navigate(`./${data.data}`)
      }
    }
  return (
    <div className="h-[78vh] border bg-gray-50 p-40 overflow-y-auto rounded-md justify-center items-center">
      <div className="w-full  space-y-6">
        <h1 className="text-2xl font-bold text-center">What can I help with?</h1>
        <div className="p-4 rounded-lg flex items-center">
          <Input
            className="border flex-grow"
            placeholder="Message ChatGPT"
          />
          <Button
            type="text"
            className="ml-2 border hover:bg-gray-600"
            onClick={()=>handleFirstSend()}
            icon={<span className="material-icons border rounded-md p-1 ml-1"><SendOutlined/></span>} // Replace with Ant Design icon if needed
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Button className=" hover:bg-gray-600">
            Create image
          </Button>
          <Button className=" hover:bg-gray-600">
            Summarize text
          </Button>
          <Button className=" hover:bg-gray-600">
            Code
          </Button>
          <Button className=" hover:bg-gray-600">
            Get advice
          </Button>
          <Button className=" hover:bg-gray-600">
            Help me write
          </Button>
          <Button className=" hover:bg-gray-600">
            More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewChat;
