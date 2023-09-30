import React from "react";
import "./styles/button.css";

const Button = ({ text, isPrimary, type, action }) => {
  return (
    <button
      type={type}
      className={`button ${isPrimary ? "primary" : "secondary"}`}
      onClick={action}
    >
      {text}
    </button>
  );
};

export default Button;
