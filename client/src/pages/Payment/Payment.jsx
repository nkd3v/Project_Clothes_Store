import React, { useState } from "react";
import "./payment.css";
import Receipt from "../../components/Receipt";
import Button from "../../components/Button";
import shirtImg from "./assets/shirt.png";
import qrCodeImg from "./assets/qr-code.png";

const Payment = () => {
  const [paymentState, setPaymentState] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentState) {
      console.log("Complete payment");
      return;
    }
    setPaymentState(true);
  };
  return (
    <div className="payment">
      <div className="container">
        <header>
          <h1>ชำระเงิน</h1>
        </header>

        <div className="wrapper">
          <article className="left-wrapper">
            {!paymentState ? (
              <form className="address-form" onSubmit={handleSubmit}>
                <h2>บันทึกที่อยู่</h2>
                <div className="input-field">
                  <label htmlFor="firstname">ชื่อ *</label>
                  <input id="firstname" type="text" required />
                </div>
                <div className="input-field">
                  <label htmlFor="lastname">นามสกุล *</label>
                  <input id="lastname" type="text" required />
                </div>
                <div className="input-field">
                  <label htmlFor="postcode">รหัสไปรษณีย์ *</label>
                  <input id="postcode" type="number" required />
                </div>
                <div className="input-field">
                  <label htmlFor="address">ที่อยู่ *</label>
                  <input id="address" type="text" required />
                </div>
                <div className="input-field">
                  <label htmlFor="add-address">ที่อยู่เพิ่มเติม</label>
                  <input id="add-address" type="text" />
                </div>
                <div className="input-field">
                  <label htmlFor="district">เขต/อำเภอ *</label>
                  <input id="district" type="text" required />
                </div>
                <div className="input-field">
                  <label htmlFor="province">จังหวัด *</label>
                  <input id="province" type="text" required />
                </div>
                <div className="input-field">
                  <label htmlFor="phone-number">โทรศัพท์ *</label>
                  <input id="phone-number" type="number" required />
                </div>
                <Button
                  text="ดำเนินการชำระเงิน"
                  isPrimary={true}
                  type="submit"
                />
              </form>
            ) : (
              <form className="payment-form" onSubmit={handleSubmit}>
                <img className="qr-code-img" src={qrCodeImg} alt="qr-code" />
                <p className="price">250 THB</p>
                <div className="input-field">
                  <label htmlFor="slip">อัพโหลด สลิป</label>
                  <input id="slip" type="file" />
                </div>
                <div className="input-field">
                  <label htmlFor="name">ชื่อ</label>
                  <input id="name" type="text" />
                </div>
                <div className="input-field">
                  <label htmlFor="time">เวลา</label>
                  <input id="time" type="time" />
                </div>
                <div className="input-field">
                  <label htmlFor="date">วันที่</label>
                  <input id="date" type="date" />
                </div>
                <Button
                  text="ดำเนินการชำระเงิน"
                  isPrimary={true}
                  type="submit"
                />
              </form>
            )}
          </article>
          <section className="right-wrapper">
            <Receipt />
            <div className="order-container">
              <h2>รายการสินค้า</h2>
              <div className="order-list">
                <img src={shirtImg} alt="shirt" />
                <p>x1</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Payment;
