import React, { useEffect, useState } from "react";
import "./my-order.css";
import Order from "./components/Order";
const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const getMyOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/orders/merchant",
        {
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();

        setOrders(data);
      } else {
        alert(
          "Get my orders failed. Server returned an error: " + response.status
        );
      }
    } catch (err) {
      console.error("error when get my orders: ", err);
    }
  };
  useEffect(() => {
    getMyOrders();
  }, []);

  return (
    <div className="my-order">
      <div className="container">
        <header>
          <h1>ORDERS</h1>
        </header>
        <section className="wrapper">
          {orders?.map((order, idx) => (
            <Order order={order} key={idx} getMyOrders={getMyOrders} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default MyOrder;
