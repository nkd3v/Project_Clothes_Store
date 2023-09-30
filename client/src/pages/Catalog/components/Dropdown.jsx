import React from "react";
import "./styles/dropdown.css";

const Dropdown = ({ header, items, id }) => {
  return (
    <div className="dropdown">
      <div className="field">
        <label htmlFor={id} className="dropdown-header">
          {header}
        </label>
        <input id={id} className="checkbox" type="checkbox" />
      </div>
      <div className="dropdown-items">
        {items?.map((item, idx) => (
          <p key={idx} className="item">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
