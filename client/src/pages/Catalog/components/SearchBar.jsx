import React, { useRef } from "react";
import "./styles/search-bar.css";
const SearchBar = ({ setSearchWord }) => {
  const inputRef = useRef();
  return (
    <form
      className="search-bar"
      onSubmit={(e) => {
        e.preventDefault();
        setSearchWord(inputRef?.current?.value);
      }}
    >
      <input type="text" placeholder="ค้นหาสินค้า" ref={inputRef} />
      <button className="search-btn" type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
};

export default SearchBar;
