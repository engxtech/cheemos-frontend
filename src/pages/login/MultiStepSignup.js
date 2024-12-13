import React, { useState } from "react";
import image1 from "../../assets/icon.jpeg";
import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    <Step1 key="step1" />,
    <Step2 key="step2" />,
    <Step3 key="step3" />,
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const navigate =useNavigate()
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
    if(currentStep==0){
        navigate('/onboarding')
    }
  };

  return (
    <div
      className="bg-gray-100 flex items-center h-[100vh]  bg-cover bg-no-repeat 
"
    //   style={{
    //     backgroundImage:
    //       "url('https://img.freepik.com/free-vector/white-abstract-background_23-2148806276.jpg?semt=ais_hybrid')",
    //   }}
    >
      <div className="flex flex-col justify-start rounded-2xl w-[35vw] mx-auto p-9 h-[80vh] bg-white border  shadow-md">
        {/* Step Indicator */}
        <div className="flex justify-between mb-8 items-start">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-1/3 border-t-4 ${
                index <= currentStep ? "border-indigo-500" : "border-gray-300"
              }`}
            ></div>
          ))}
        </div>

        {/* Current Step */}
        <div className="h-[60vh]">{steps[currentStep]}</div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            className={` bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm`}

          >
            {currentStep === 0 ? "Cancel" : "Back"}
          </button>
          <button
            onClick={handleNext}
            className="btn bg-indigo-500 text-white px-4 py-2 rounded text-sm"
          >
            {currentStep === steps.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Step 1 Component
const Step1 = () => (
  <div className="">
    <div className="flex space-x-2 items-end mb-4">
    <Avatar src={image1} size={60} />
    <h2 className="text-xl font-medium mb-4">Create a Profile</h2>
    </div>
    
    <form>
      <div className="mb-4">
        <label className="block text-sm text-gray-700">First Name *</label>
        <input
          className="border rounded w-full p-2 text-sm"
          placeholder="Enter first name..."
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-700">Last Name *</label>
        <input
          className="border rounded w-full p-2 text-sm"
          placeholder="Enter last name..."
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-700">Password *</label>
        <input
          type="password"
          className="border rounded w-full p-2 text-sm"
          placeholder="Enter password..."
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-700 ">
          Confirm Password *
        </label>
        <input
          type="password"
          className="border rounded w-full p-2 text-sm"
          placeholder="Re-enter password..."
        />
      </div>
      <div className="flex items-center">
        <input type="checkbox" className="mr-2" />
        <span className="text-sm text-gray-500 italic">I agree to the terms and conditions</span>
      </div>
    </form>
  </div>
);

// Step 2 Component
const Step2 = () => (
  <div>
    <h2 className="text-xl font-medium mb-4">Additional Info</h2>
    <form>
      <div className="mb-4">
        <label className="block text-sm text-gray-700">Company Name *</label>
        <input
          className="border rounded w-full p-2"
          placeholder="Enter company name..."
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-700">Job Function *</label>
        <select className="border rounded w-full p-2">
          <option value="">Select...</option>
          <option>Finance</option>
          <option>Engineering</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-700">
          Where did you hear about us?
        </label>
        <select className="border rounded w-full p-2">
          <option value="">Select...</option>
          <option>Referral</option>
          <option>Social Media</option>
        </select>
      </div>
    </form>
  </div>
);

// Step 3 Component
const Step3 = () => (
  <div className="">
    <h2 className="text-xl font-medium mb-4">
      Any Plans to use Cheemos?
    </h2>
    <div className="grid grid-cols-1 gap-4">
      <div className="p-4 border rounded-lg cursor-pointer hover:shadow-md bg-blue-100">
        <div className="flex items-center space-x-2">
          <Avatar src={image1} size={60} />
          <p className="font-medium">Build AI agents</p>
        </div>
        <p className="text-sm px-4">
          I want to create AI agents to automate dynamic processes.
        </p>
      </div>
      <div className="p-4 border rounded-lg cursor-pointer hover:shadow-md bg-red-100">
        <div className="flex items-center space-x-2">
          <Avatar src={image1} size={60} />
          <p className="font-medium">Build tools</p>
        </div>
        <p className="text-sm px-4">
          I want to create AI tools to automate a step-by-step process.
        </p>
      </div>
      <div className="p-4 border rounded-lg cursor-pointer hover:shadow-md bg-green-100">
        <div className="flex items-center space-x-2">
          <Avatar src={image1} size={60} />
          <p className="font-medium">Custom actions for GPTs</p>
        </div>
        <p className="text-sm px-4">
          I want to create no-code custom actions for my GPTs.
        </p>
      </div>
    </div>
  </div>
);

export default MultiStepForm;
