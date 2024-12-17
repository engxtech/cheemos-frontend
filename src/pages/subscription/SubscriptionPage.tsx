import React, { useState } from "react";
import { Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";

export const SubscriptionPopup = ({
  agentId,
  visible,
  setVisible,
}: {
  agentId: string;
  visible: boolean;
  setVisible: (value: boolean) => void;
}) => {
  const navigate = useNavigate();
  const setPlan = async () => {
    const url = process.env.REACT_APP_API_URL + `/api/v1/payments/create`;
    const payload = {
      orderId: agentId,
      currencyType: "INR",
      payment: "100",
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type":"application/json"
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      const data = await response.json();
      window.open(data.paymentUrl, "_blank");
    }
  };
  return (
    <Modal
      title="Manage your plan"
      open={visible}
      onCancel={() => setVisible(false)}
      footer={null}
      width={800}
      maskStyle={{
        backgroundColor: "rgba(255, 255, 255, 0.3)", // White translucent mask
      }}
    >
      <div className="h-[50vh] p-4">
        {/* Add your UI components for the plans here */}
        <div className="flex justify-between items-center ">
          {/* Example UI for plans */}
          <div className="w-[46%] border p-4   h-[45vh] space-y-4 bg-red-200 rounded-md">
            <h1 className="text-lg">Hire to Use</h1>
            <p>$599 per month</p>
            <Button type="primary" onClick={() => setPlan()}>
              Select Plan
            </Button>
          </div>
          <div className="w-[46%] border p-4  h-[45vh] space-y-4 bg-violet-200 rounded-md">
            <h3 className="text-lg">Hire to build</h3>
            <p>Custom</p>
            <Button type="primary">Select Plan</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
