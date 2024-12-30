import React, { useState } from "react";
import { Modal, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { CloseOutlined } from "@mui/icons-material";

export const SubscriptionPopup = ({
  price,
  agentId,
  visible,
  setVisible,
}: {
  price: number;
  agentId: string;
  visible: boolean;
  setVisible: (value: boolean) => void;
}) => {
  const navigate = useNavigate();
  const setPlan = async () => {
    setLoading(true)
    const url = process.env.REACT_APP_API_URL + `/api/v1/payments/create`;
    const payload = {
      orderId: agentId,
      currencyType: "INR",
      payment: price,
      cloneType: "USER",
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      const data = await response.json();
      setLoading(false)
      navigate('/agents')
      window.open(data.paymentUrl, "_blank");
    }
    setLoading(false)
  };
  const [loading,setLoading] =useState(false)
  const setFreePlan = async () => {
    setLoading(true)
    const url =
      process.env.REACT_APP_API_URL + `/api/v1/template/clone/${agentId}`;
    const payload = {
      cloneType: "USER",
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (result.success) {
      message.success("Agent clone successfully!");
      setLoading(false)
      navigate("/agents");
    } else {
      setLoading(false)
      message.error("Failed to  clone agent!");
    }
  };
  return (
    <Modal
      open={visible}
      onCancel={() => setVisible(false)}
      footer={null}
      bodyStyle={{
        color: "white", // White text color
      }}
      width={800}
      maskStyle={{
        backgroundColor: "rgba(0, 0, 0, 0.6)", // White translucent mask
      }}
      closeIcon={<CloseOutlined style={{ color: "white" }} />}
      className="dark-modal"
    >
      <div className="h-[50vh] p-4">
        {/* Add your UI components for the plans here */}
        <div className="sm:flex  justify-between items-center space-y-2">
          {/* Example UI for plans */}
          <div className="sm:w-[46%]  p-4  border sm:h-[45vh] space-y-4 bg-gray-100 rounded-md">
            <h1 className="text-xl font-semibold">Hire to Use</h1>
            <img
              src={
                "https://media.licdn.com/dms/image/v2/D5612AQHx_R0xA3X2oQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1729480091696?e=2147483647&v=beta&t=2MSeyu4F4aLJPnAC4Ii8lT3P6w410ywoUB1ikrk-yhg"
              }
               className=" h-[21vh]"
            />
            <p className="flex justify-end">
              {price == 0 ? "FREE" : `$ ${price} per month`}{" "}
            </p>
            <Button
              type="primary"
              onClick={() => (price == 0 ? setFreePlan() : setPlan())}
              loading={loading}
              disabled={loading}
            >
              {!loading?"Select Plan":<span className={`${loading?"text-white":"text-white"}`}>Loading...</span>}
            </Button>
          </div>
          <div className="sm:w-[46%] border p-4  sm:h-[45vh] space-y-4 bg-gray-100 rounded-md">
            <h3 className="text-xl font-semibold">Hire to build</h3>
            <img
              src={
                "https://media.licdn.com/dms/image/v2/D5612AQHx_R0xA3X2oQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1729480091696?e=2147483647&v=beta&t=2MSeyu4F4aLJPnAC4Ii8lT3P6w410ywoUB1ikrk-yhg"
              }
              className=" h-[21vh]"
            />
            <p className="flex justify-end">Custom</p>
            <Button
              type="primary"
              onClick={() =>
                message.info(
                  "The feature to hire agent to build your agent will be launched soon!"
                )
              }
            >
              Select Plan
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
