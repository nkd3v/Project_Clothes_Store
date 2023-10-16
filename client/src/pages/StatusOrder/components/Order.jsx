import React from "react";
import OrderItem from "./OrderItem";

const Order = ({ order, index }) => {
  return (
    <div className="order">
      <header className="order-header">
        <p className="order-name">Order {index}</p>
        <div className="order-status">
          <p>Expected Completion</p>
          <p>Oct 12,2077</p>
        </div>
      </header>
      <section className="order-statusbar">
        <div className="margin-area">
          <div className="dot one">1</div>
          <div className="dot two">2</div>
          <div
            className={`dot three ${
              order?.status === "Shipped" ? "passed" : ""
            }`}
          >
            3
          </div>
          <div className="dot four">4</div>
          <div className="progress-bar first"></div>
          <div
            className={`progress-bar second ${
              order?.status === "Shipped" ? "passed" : ""
            }`}
          ></div>
          <div className="progress-bar third"></div>
          <div className="message message-1">ชำระเงินสำเร็จ</div>
          <div className="message message-2">เตรียมสินค้า</div>
          <div className="message message-3">กำลังส่ง</div>
          <div className="message message-4">ได้รับสินค้า</div>
        </div>
      </section>
      <section className="order-bottom">
        <div className="order-item-wrapper">
          {order?.OrderItems?.map((orderItem, idx) => (
            <OrderItem key={idx} orderItem={orderItem} />
          ))}
        </div>
        <div className="order-result">
          <p className="order-result-header">
            สรุปคำสั่งซื้อ | {order?.totalOrderCount} รายการ
          </p>
          <div className="order-result-detail">
            <p>รวมมูลค่าสินค้า</p>
            <div>
              <p>THB {order?.totalPrice}</p>
            </div>
          </div>
          <div className="order-result-detail">
            <p>ยอกรวม</p>
            <p>THB {order?.totalPrice}</p>
          </div>
          <div className="order-result-detail">
            <p>ราคารวมท้ังหมด</p>
            <p>THB {order?.totalPrice}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Order;
