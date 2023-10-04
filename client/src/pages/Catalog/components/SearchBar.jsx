import React, { useRef } from "react";
import "./styles/search-bar.css";
const SearchBar = ({ setSearchWord }) => {
  const inputRef = useRef();
  return (
    <div className="search-bar">
      <input type="text" placeholder="ค้นหาสินค้า" ref={inputRef} />
      <button className="search-btn">
        <i
          className="fa-solid fa-magnifying-glass"
          onClick={() => setSearchWord(inputRef?.current?.value)}
        ></i>
      </button>
    </div>
  );
};

export default SearchBar;
