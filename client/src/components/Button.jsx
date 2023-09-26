import React from "react";
import "./styles/button.css";

const Button = ({ text, isPrimary, action }) => {
  return (
    <button
      className={`button ${isPrimary ? "primary" : "secondary"}`}
      onClick={action}
    >
      {text}
    </button>
  );
};

export default Button;
