import React, { useState } from "react";
import Button from "../../../components/Button";
import "./order.css";

const Order = ({ order, getMyOrders }) => {
  const [isShipped, setIsShipped] = useState(
    order?.status === "Shipped" ? true : false
  );
  const handleShip = async () => {
    const statusData = {
      id: order?.id,
      orderStatusId: 2,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/orders/update-status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(statusData),
        }
      );

      if (response.ok) {
        const { message } = await response.json();
        getMyOrders();
        setIsShipped(true);
        console.log(message);
      } else {
        alert(
          "Change status failed. Server returned an error: " + response.status
        );
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };
  return (
    <div className="order">
      <div className="panel">
        <div className="left-wrapper">
          <h2 className="order-id">Order Number: {order?.id}</h2>
          <div className="product">
            <img
              src={`${import.meta.env.VITE_API_URL}/api/v1/uploads/${order?.OrderItems[0]?.ProductVariant?.imageUrl}`}
              alt="product"
              className="product-img"
            />
            <div className="detail">
              <h4 className="name">
                {order?.OrderItems[0]?.ProductVariant?.Product?.name}
              </h4>
              <p className="code">
                รหัสสินค้า: {order?.OrderItems[0]?.ProductVariant?.id}
              </p>
              <p className="color">
                สี: {order?.OrderItems[0]?.ProductVariant?.colorName}
              </p>
              <p className="size">
                ขนาด : {order?.OrderItems[0]?.ProductVariant?.Product?.gender}{" "}
                {order?.OrderItems[0]?.ProductVariant?.size}
              </p>
              <p className="price">
                THB {order?.OrderItems[0]?.ProductVariant?.price}
              </p>
              <p className="quantity">
                จำนวน {order?.OrderItems[0]?.quantity} ชิ้น
              </p>
            </div>
          </div>
        </div>
        <div className="right-wrapper">
          <h2 className="status">
            สถานะ : <span className="status-value">{order?.status}</span>
          </h2>
          <div className="block">
            <p>สรุปคำสั่งซื้อ | {order?.OrderItems[0]?.quantity} รายการ</p>
            <div className="row">
              <p>รวมมูลค่าสินค้า</p>
              <p>THB {order?.totalPrice}</p>
            </div>
          </div>

          <div className="row">
            <p>ยอดรวม</p>
            <p>THB {order?.totalPrice}</p>
          </div>
          <div className="row">
            <p>ราคารวมทั้งหมด</p>
            <p>THB {order?.totalPrice}</p>
          </div>
        </div>
      </div>
      <div className="btn-wrapper">
        <Button
          text={isShipped ? "จัดส่งแล้ว" : "จัดส่ง"}
          isPrimary={true}
          type="button"
          action={handleShip}
          disabled={isShipped}
        />
      </div>
    </div>
  );
};

export default Order;
