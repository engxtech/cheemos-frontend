import { message, Spin } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const PaymentPage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const agentId = useParams().agentId;
  const cloneType = useParams().cloneType;
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      const paymentDetails = {
        paymentId: urlParams.get("razorpay_payment_id"),
        paymentLinkId: urlParams.get("razorpay_payment_link_id"),
        paymentLinkReferenceId: urlParams.get(
          "razorpay_payment_link_reference_id"
        ),
        paymentStatus: urlParams.get("razorpay_payment_link_status"),
        signature: urlParams.get("razorpay_signature"),
        orderId: agentId,
      };

      console.log("Payment Details:", paymentDetails);

      try {
        const url = process.env.REACT_APP_API_URL + "/api/v1/payments";
        const response = await fetch(url, {
          method: "PATCH",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentDetails),
        });

        const result = await response.json();
        console.log("Verification Result:", result);

        if (result.success) {
          const url =
            process.env.REACT_APP_API_URL + `/api/v1/template/clone/${agentId}`;
          const payload = {
            cloneType: cloneType,
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
          if(result.success){
            message.success("Agent clone successfully!")
            window.close();
          }else{
            message.error("Failed to  clone agent!")
          }
         
        } else {
          alert("Payment verification failed. Please contact support.");
        }
      } catch (error) {
        console.error("Error during verification:", error);
        alert("An error occurred. Please try again later.");
      }
    };

    fetchPaymentDetails();
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-50">
      <Spin size="large" />
      <h1 className="mt-6 text-xl font-semibold text-gray-700">
        Processing Your Payment...
      </h1>
      <p className="mt-2 text-gray-500">
        Please wait while we verify your payment.
      </p>
    </div>
  );
};

export default PaymentPage;
