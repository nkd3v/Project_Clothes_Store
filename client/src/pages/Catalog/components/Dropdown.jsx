import React from "react";
import "./styles/dropdown.css";

const Dropdown = ({ name, items, id, callBack, type, itemStyle }) => {
  const handleClick = (e, item) => {
    const items = document.querySelectorAll(".item");
    const element = e.target;
    if (itemStyle === "category") {
      items.forEach((item) => {
        item?.classList?.remove("checked");
      });
      callBack(element.innerHTML);
      element?.classList?.add("checked");
      return;
    }
    if (element.classList.contains("checked")) {
      const findValue = element.innerHTML;

      callBack((prev) => prev.filter((p) => p !== findValue));
      element.classList.remove("checked");
    } else {
      callBack((prev) => [...prev, item]);
      element.classList.add("checked");
    }
  };
  return (
    <div className="dropdown">
      <div className="field">
        <label htmlFor={id} className="dropdown-header">
          {name}
        </label>
        <input id={id} className="checkbox" type="checkbox" />
      </div>
      <div className={`dropdown-items ${type}`}>
        {items?.map((item, idx) => (
          <p
            key={idx}
            className={`item ${itemStyle}`}
            style={itemStyle == "color" ? { backgroundColor: item } : {}}
            onClick={(e) => handleClick(e, item)}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
