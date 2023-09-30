import React from "react";
import "./styles/receipt.css";

const Receipt = () => {
  return (
    <div className="receipt">
      <p>สรุปคำสั่งซื้อ | 1 รายการ</p>
      <div className="row">
        <p>รวมมูลค่าสินค้า</p>
        <p className="total-price">THB 250.00</p>
      </div>
      <div className="row pop">
        <p>ยอดรวม</p>
        <p className="total-price">THB 250.00</p>
      </div>
      <div className="row pop">
        <p>ราคารวมทั้งหมด</p>
        <p className="total-price">THB 250.00</p>
      </div>
    </div>
  );
};

export default Receipt;
