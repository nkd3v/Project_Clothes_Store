import React, { useEffect, useState } from "react";
import "./status-order.css";
import Order from "./components/Order";
const StatusOrder = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/orders", {
          credentials: "include",
        });
        if (response.ok) {
          const _res = await response.json();
          setOrders(_res);
          console.log("complete get orders in status page");
        } else {
          console.error(
            "Get product in cart failed. Server returned an error: " +
              response.status
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getAllOrders();
  }, []);
  return (
    <div className="status-order">
      <div className="container">
        <header>
          <h1 className="header">การสั่งซื้อสินค้า</h1>
        </header>
        {orders.length === 0 && <p>ยังไม่มีรายการสั่งสินค้า</p>}
        {orders?.map((order, idx) => (
          <Order key={order.id} order={order} index={idx + 1} />
        ))}
      </div>
    </div>
  );
};

export default StatusOrder;
