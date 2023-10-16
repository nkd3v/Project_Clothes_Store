import React from "react";
import "./styles/loading.css";
const Loading = () => {
  return (
    <div className="loading">
      Loading <span className="dot one">.</span>
      <span className="dot two">.</span>
      <span className="dot three">.</span>
    </div>
  );
};

export default Loading;
