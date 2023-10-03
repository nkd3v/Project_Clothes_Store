import React from "react";

const Order = ({ item }) => {
  return (
    <div className="order">
      <img
        src={`http://localhost:3000/api/v1/uploads/${item?.ProductVariant?.imageUrl}`}
        alt=""
      />
      <div className="info">
        <p className="name">{item?.ProductVariant?.Product?.name}</p>
        <p className="code">รหัสสินค้า: {item?.ProductVariant?.id}</p>
        <p className="color">สี : {item?.ProductVariant?.colorName}</p>
        <p className="size">ขนาด : {item?.ProductVariant?.size}</p>
        <p className="price">THB {item?.ProductVariant?.price}</p>
        <p className="amount-select">
          จำนวน <span>{item?.quantity}</span>
        </p>
      </div>
    </div>
  );
};

export default Order;
