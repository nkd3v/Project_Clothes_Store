import "./cart.css";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import Receipt from "../../components/Receipt";
import { useEffect, useRef, useState } from "react";
import Order from "./components/Order";
function Cart({ totalOrder }) {
  const navigate = useNavigate();
  const [productInCart, setProductInCart] = useState([]);
  const [coupon, setCoupon] = useState("");

  console.log(productInCart);

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
          console.error(
            "Get product in cart failed. Server returned an error: " +
              response.status
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getProductsInCart();
  }, [coupon]);

  // useEffect(() => {
  //   const total = productInCart?.cartItems?.reduce(
  //     (total, { quantity }) => total + quantity,
  //     0
  //   );
  //   setTotalOrder(total);
  // }, [productInCart]);

  const handlePayment = () => {
    navigate(
      `/payment?totalPrice=${productInCart?.totalPrice}&totalOrder=${totalOrder}`
    );
  };

  const handleCoupon = () => {
    const postCoupon = async () => {
      const couponData = {
        couponCode: coupon,
      };
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/carts/apply-coupon",
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

          // setCoupon({ code: coupon.input, input: "" });
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
            {productInCart?.cartItems?.length === 0 && (
              <p className="empty">ตะกร้าของคุณว่างอยู่</p>
            )}
            {productInCart?.cartItems?.map((item, idx) => (
              <Order key={idx} item={item} />
            ))}
          </section>
          <section className="summary-orders">
            <Receipt
              totalPrice={productInCart?.totalPrice}
              totalOrder={totalOrder}
              coupon={productInCart?.coupon?.code}
            />

            {productInCart?.cartItems?.length !== 0 && (
              <>
                <div className="coupon-container">
                  <input
                    type="text"
                    placeholder="ใส่คูปอง"
                    className="coupon-input"
                    value={coupon}
                    onChange={(e) => {
                      // setCoupon({
                      //   ...coupon,
                      //   input: e.target.value,
                      // });
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
