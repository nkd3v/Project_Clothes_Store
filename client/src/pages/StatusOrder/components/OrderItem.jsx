import React from "react";

const OrderItem = ({ orderItem }) => {
  return (
    <div className="order-item">
      <img
        src={`${import.meta.env.VITE_API_URL}/api/v1/uploads/${orderItem?.ProductVariant?.imageUrl}`}
        alt="product"
        width="250px"
        height="250px"
      />
      <div className="order-item-details">
        <p className="order-item-header">
          {orderItem?.ProductVariant?.Product?.name}
        </p>
        <p className="order-item-id">
          รหัสสินค้า: {orderItem?.ProductVariantId}
        </p>
        <p className="order-item-color">
          สี: {orderItem?.ProductVariant?.colorName}
        </p>
        <p className="order-item-size">
          ขนาด : {orderItem?.ProductVariant?.size}
        </p>
        <p className="order-item-price">
          THB {orderItem?.ProductVariant?.price}
        </p>
        <p className="order-item-amount">จำนวน : {orderItem?.quantity}</p>
      </div>
    </div>
  );
};

export default OrderItem;
