import React from "react";
import "./styles/product-card.css";
import storeIcon from "../assets/store-icon.svg";
import { useNavigate } from "react-router-dom";
const ProductCard = ({ productObj }) => {
  const navigate = useNavigate();
  const handleClickProduct = () => {
    navigate(`/product/preview/${productObj.id}`);
  };
  return (
    <div className="product-card" onClick={handleClickProduct}>
      <img src={productObj.image} alt="product" />
      <article>
        <div className="color-list">
          {productObj?.colorList?.map((color, idx) => (
            <div
              key={idx}
              className="color"
              style={{ backgroundColor: color }}
            ></div>
          ))}
        </div>
        <div className="name">{productObj?.name}</div>
        <div className="row">
          <div className="gender">{productObj?.gender}</div>
          <div className="size">{productObj?.size}</div>
        </div>
        <div className="store-name">
          <img src={storeIcon} alt="store" width={15} />
          {"\t"}
          {productObj?.storeName}
        </div>
        <div className="price">THB {productObj?.price}</div>
      </article>
    </div>
  );
};

export default ProductCard;
