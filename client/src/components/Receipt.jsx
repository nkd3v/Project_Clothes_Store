import React from "react";
import "./styles/receipt.css";

const Receipt = ({ totalPrice, totalOrder, coupon }) => {
  return (
    <div className="receipt">
      <p>
        สรุปคำสั่งซื้อ | {totalOrder} รายการ{" "}
        {coupon && (
          <span className="discount">&#40;ใช้คูปอง {coupon}&#41;</span>
        )}
      </p>
      <div className="row">
        <p>รวมมูลค่าสินค้า</p>
        <p className="total-price">THB {totalPrice}</p>
      </div>
      <div className="row pop">
        <p>ยอดรวม</p>
        <p className="total-price">THB {totalPrice}</p>
      </div>
      <div className="row pop">
        <p>ราคารวมทั้งหมด</p>
        <p className="total-price">THB {totalPrice}</p>
      </div>
    </div>
  );
};

export default Receipt;
