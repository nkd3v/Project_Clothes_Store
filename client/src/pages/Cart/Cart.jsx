import "./cart.css";
import shirtImg from "./assets/shirt.png";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import Receipt from "../../components/Receipt";
function Cart() {
  const navigate = useNavigate();
  return (
    <div className="cart">
      <div className="container">
        <header>
          <h1>ตะกร้า</h1>
        </header>
        <div className="wrapper">
          <section className="orders">
            <img src={shirtImg} alt="" />
            <div className="info">
              <p className="name">เสื้อเชิ้ตสะเอิ้ดเบิ้ดเดิ้ด</p>
              <p className="code">รหัสสินค้า:455360</p>
              <p className="color">สี : BEIGE</p>
              <p className="size">ขนาด : Unisex M</p>
              <p className="price">THB 250.00</p>

              <label htmlFor="amount">จำนวน</label>
              <br />
              <select id="amount" className="amount-select">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
          </section>
          <section className="summary-orders">
            <Receipt />
            <div className="coupon-container">
              <input type="text" placeholder="ใส่คูปอง" class="coupon-input" />
              <button class="apply-coupon-button">ใช้คูปอง</button>
            </div>
            <Button
              isPrimary={true}
              text="ชำระเงิน"
              action={() => {
                navigate("/payment");
              }}
            />
            <Button
              isPrimary={false}
              text="เลือกซื้อสินค้าต่อ"
              action={() => {
                navigate("/catalog/women");
              }}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default Cart;
