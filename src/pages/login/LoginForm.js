import React, { useState } from "react";
import { Avatar, Button, Divider, Input, message, Typography } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Google, UnsubscribeOutlined, VerifiedUser } from "@mui/icons-material";
import image1 from "../../assets/icon.jpeg";
import { GoogleLogin } from "@react-oauth/google";

const RightSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btEmailLoading, setBtEmailLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setBtEmailLoading(true);
    setBtEmailLoading(false);
    navigate('/settings')
  };
  function handleGSignInOnSuccess(credentialResponse) {
    console.log("client cerdentials are ", credentialResponse);
    const payload = {
      googleIdTokenString: credentialResponse.credential,
    };
    new Promise(async function (resolve, reject) {
      const url =
        process.env.REACT_APP_API_BASE_URL + "/api/auth/v1/signup/google";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const authToken = await response.json();
        localStorage.setItem("token", authToken.data);
        const path = "http://localhost:3000/";
        window.location.href = path;
        resolve("Created");
      } else {
        reject("Response not ok");
      }
    }).then((val) => {});
  }


  function handleGSignInOnError() {}
  return (
    <div className="flex  justify-center items-center bg-gray-100 h-[100vh]">
      <div className="flex  shadow-sm  justify-center w-[35vw] rounded-3xl bg-white flex-col items-center h-[80vh] gap-4 border ">
        <Avatar src={image1} size={60} />
        <div className="text-center text-4xl font-serif">
          Welcome to Cheemos
        </div>
        <Typography.Text className="text-sm">
          Sign in here to continue.
        </Typography.Text>
        <div className="flex flex-col w-64 gap-3">
          <Input
            placeholder="Email Address"
            className="w-full"
            size="large"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input.Password
            placeholder="Enter Password"
            className="w-full"
            size="large"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className="w-full"
            type="primary"
            size="large"
            loading={btEmailLoading}
            onClick={handleSignUp}
          >
            Continue with email
          </Button>
          <Divider>or</Divider>
          <Button
            className="w-full"
            icon={<Google />}
            type="primary"
            style={{ backgroundColor: "black" }}
            size="large"
            onClick={navigate("/")}
          >
            Continue with Google
          </Button>
          <GoogleLogin
            onSuccess={handleGSignInOnSuccess}
            onError={handleGSignInOnError}
          />
          <Button
            className="w-full text-sm"
            type="link"
            size="large"
            onClick={() => navigate("/signup")}
          >
            Not Signed Up? Click here!
          </Button>

          <Typography.Text className="text-center text-xs text-gray-600 mt-3">
            By signing up, you agree to our{" "}
            <a href="/terms-of-service" className="underline text-blue-500">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy-policy" className="underline text-blue-500">
              Privacy Policy
            </a>
            .
          </Typography.Text>
        </div>
      </div>
    </div>
  );
};

export default RightSignUp;
