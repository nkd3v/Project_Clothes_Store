import React from "react";
import "./styles/dropdown.css";

const Dropdown = ({ name, items, id, setCategory }) => {
  return (
    <div className="dropdown">
      <div className="field">
        <label htmlFor={id} className="dropdown-header">
          {name}
        </label>
        <input id={id} className="checkbox" type="checkbox" />
      </div>
      <div className="dropdown-items">
        {items?.map((item, idx) => (
          <p key={idx} className="item" onClick={() => setCategory(item)}>
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
