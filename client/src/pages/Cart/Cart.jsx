import "./cart.css";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import Receipt from "../../components/Receipt";
import { useEffect, useRef, useState } from "react";
import OrderCart from "./components/OrderCart";
function Cart({ totalOrder, getTotalOrder }) {
  const navigate = useNavigate();
  const [productInCart, setProductInCart] = useState({});
  const [totalPrice, setTotalPrice] = useState();
  const [coupon, setCoupon] = useState("");

  useEffect(() => {
    const getProductsInCart = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/carts/products`,
          { credentials: "include" }
        );
        if (response.ok) {
          const _res = await response.json();
          setProductInCart(_res);
          setTotalPrice(_res?.totalPrice?.toFixed(2));
          console.log("succesfully fetch");
        } else {
          console.error(
            "Get product in cart failed. Server returned an error: " +
              response.status
          );
          setProductInCart({});
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getProductsInCart();
  }, [coupon, totalPrice]);

  const handlePayment = () => {
    navigate(`/payment?totalPrice=${totalPrice}&totalOrder=${totalOrder}`);
  };

  const handleCoupon = () => {
    const postCoupon = async () => {
      const couponData = {
        couponCode: coupon,
      };
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/carts/apply-coupon`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(couponData),
            credentials: "include",
          }
        );
        if (response.ok) {
          const _res = await response.json();
          setCoupon("");
          console.log(_res.message);
        } else {
          console.error(
            "Post coupon failed. Server returned an error: " + response.status
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    postCoupon();
  };

  return (
    <div className="cart">
      <div className="container">
        <header>
          <h1>ตะกร้า</h1>
        </header>
        <div className="wrapper">
          <section className="orders">
            {(productInCart?.cartItems?.length === 0 ||
              !productInCart?.cartItems) && (
              <p className="empty">ตะกร้าของคุณว่างอยู่</p>
            )}
            {productInCart?.cartItems?.map((item, idx) => (
              <OrderCart
                key={idx}
                item={item}
                getTotalOrder={getTotalOrder}
                setTotalPrice={setTotalPrice}
              />
            ))}
          </section>
          <section className="summary-orders">
            <Receipt
              totalPrice={totalPrice}
              totalOrder={totalOrder}
              coupon={productInCart?.coupon?.code}
            />

            {productInCart?.cartItems?.length !== 0 &&
              productInCart?.cartItems && (
                <>
                  <div className="coupon-container">
                    <input
                      type="text"
                      placeholder="ใส่คูปอง"
                      className="coupon-input"
                      value={coupon}
                      onChange={(e) => {
                        setCoupon(e.target.value);
                      }}
                    />
                    <button
                      onClick={handleCoupon}
                      className="apply-coupon-button"
                    >
                      ใช้คูปอง
                    </button>
                  </div>
                  <Button
                    isPrimary={true}
                    text="ชำระเงิน"
                    action={handlePayment}
                  />
                </>
              )}

            <Button
              isPrimary={false}
              text="เลือกซื้อสินค้าต่อ"
              action={() => {
                navigate("/catalog/women");
              }}
            />
            <Button
              isPrimary={false}
              text="ตรวจสอบสถานะสินค้า"
              action={() => {
                navigate("/status");
              }}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default Cart;
