// src/components/ProgressBar.jsx
import React from "react";

const ProgressBar = ({ progress }) => {
  if (progress <= 0) return null;

  return (
    <div
      style={{
        marginTop: "10px",
        width: "300px",
        background: "#ddd",
        borderRadius: "4px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          background: "#4caf50",
          height: "20px",
          textAlign: "center",
          lineHeight: "20px",
          color: "white",
          fontWeight: "bold",
          transition: "width 0.3s ease",
        }}
      >
        {progress}%
      </div>
    </div>
  );
};

export default ProgressBar;
