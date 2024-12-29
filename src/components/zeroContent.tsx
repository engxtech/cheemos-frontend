import React from "react";

const EmptyContent: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[90vh] w-full text-gray-600">
      <img
        src="https://cdni.iconscout.com/illustration/free/thumb/free-empty-box-illustration-download-in-svg-png-gif-file-formats--cart-is-explore-states-pack-design-development-illustrations-3385480.png" // Replace with your image path
        alt="Empty Box"
        className="w-60 h-48 mb-4"
      />
      <p className="text-lg">{message || "No content available."}</p>
    </div>
  );
};

export default EmptyContent;
