import React from "react";

const OrederItem = ({ item }) => {
  return (
    <div className="order-item">
      <img
        src={`${import.meta.env.VITE_API_URL}/api/v1/uploads/${
          item?.ProductVariant?.imageUrl
        }`}
        alt="product"
        className="product-img"
      />
      <div className="detail">
        <h4 className="name">{item?.ProductVariant?.Product?.name}</h4>
        <p className="code">รหัสสินค้า: {item?.ProductVariant?.id}</p>
        <p className="color">สี: {item?.ProductVariant?.colorName}</p>
        <p className="size">
          ขนาด : {item?.ProductVariant?.Product?.gender}{" "}
          {item?.ProductVariant?.size}
        </p>
        <p className="price">THB {item?.ProductVariant?.price}</p>
        <p className="quantity">จำนวน {item?.quantity} ชิ้น</p>
      </div>
    </div>
  );
};

export default OrederItem;
