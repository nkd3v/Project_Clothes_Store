import React, { useEffect, useState } from "react";
import "./payment.css";
import Receipt from "../../components/Receipt";
import Button from "../../components/Button";
import shirtImg from "./assets/shirt.png";
import qrCodeImg from "./assets/qr-code.png";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = ({ getTotalOrder }) => {
  const [paymentState, setPaymentState] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const totalPrice = queryParams.get("totalPrice");
  const totalOrder = queryParams.get("totalOrder");
  const [productInCart, setProductInCart] = useState({});

  useEffect(() => {
    const getProductsInCart = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/carts/products",
          { credentials: "include" }
        );
        if (response.ok) {
          const _res = await response.json();
          setProductInCart(_res);
          console.log("succesfully fetch");
        } else {
          alert(
            "Get product in cart failed. Server returned an error: " +
              response.status
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getProductsInCart();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentState) {
      const postOrder = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/v1/orders", {
            method: "POST",
            credentials: "include",
          });
          if (response.ok) {
            await getTotalOrder();
            navigate("/status");
            console.log("Complete created user orders");
            console.log("Complete payment");
          } else {
            console.error(
              "Post order failed. Server returned an error: " + response.status
            );
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      postOrder();
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
                <p className="price">{totalPrice} THB</p>
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
            <Receipt totalOrder={totalOrder} totalPrice={totalPrice} />
            <div className="order-container">
              <h2>รายการสินค้า</h2>
              <div className="order-list">
                {productInCart?.cartItems?.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <img
                      src={`http://localhost:3000/api/v1/uploads/${item?.ProductVariant?.imageUrl}`}
                      alt="product"
                    />
                    <p>x{item?.quantity}</p>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Payment;
