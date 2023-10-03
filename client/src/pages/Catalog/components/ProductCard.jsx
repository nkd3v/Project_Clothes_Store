import React, { useEffect, useState } from "react";
import "./styles/product-card.css";
import storeIcon from "../assets/store-icon.svg";
import { useNavigate } from "react-router-dom";
const ProductCard = ({ productObj }) => {
  const navigate = useNavigate();
  const [listColor, setListColor] = useState([]);

  useEffect(() => {
    const colorSet = new Set(
      productObj?.ProductVariants?.map((variant) => variant.color)
    );

    // Convert the Set back to an array if needed
    const colorList = Array.from(colorSet);
    setListColor(colorList);
  }, [productObj]);
  const handleClickProduct = () => {
    navigate(`/product/preview/${productObj.id}`);
  };
  return (
    <div className="product-card" onClick={handleClickProduct}>
      <img
        src={`http://localhost:3000/api/v1/uploads/${productObj.ProductVariants[0].imageUrl}`}
        alt="product"
      />
      <article>
        <div className="color-list">
          {listColor?.map((clr, idx) => (
            <div
              key={idx}
              className="color"
              style={{ backgroundColor: clr }}
            ></div>
          ))}
        </div>
        <div className="name">{productObj?.name}</div>
        <div className="row">
          <div className="gender">{productObj?.gender}</div>
          <div className="size">
            {productObj?.minSize}-{productObj?.maxSize}
          </div>
        </div>
        <div className="store-name">
          <img src={storeIcon} alt="store" width={15} />
          {"\t"}
          {productObj?.brand}
        </div>
        <div className="price">THB {productObj?.minPrice}</div>
      </article>
    </div>
  );
};

export default ProductCard;
