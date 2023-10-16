import React from "react";
import "./styles/button.css";

const Button = ({ text, isPrimary, type, action, disabled }) => {
  return (
    <button
      type={type}
      className={`button ${isPrimary ? "primary" : "secondary"}`}
      onClick={action}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
