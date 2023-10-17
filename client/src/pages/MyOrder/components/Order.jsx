import React, { useState } from "react";
import Button from "../../../components/Button";
import "./order.css";
import OrederItem from "./OrederItem";

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
          {order?.OrderItems?.map((orderItem) => (
            <OrederItem item={orderItem} />
          ))}
        </div>
        <div className="right-wrapper">
          <h2 className="status">
            สถานะ : <span className="status-value">{order?.status}</span>
          </h2>
          <div className="block">
            <p>สรุปคำสั่งซื้อ | {order?.OrderItems?.length} รายการ</p>
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
