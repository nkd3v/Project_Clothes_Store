import React, { useState } from "react";
import "./preview.css";
import { useNavigate, useParams } from "react-router-dom";
import shirt1Img from "./assets/shirt1.png";
import shirt2Img from "./assets/shirt2.png";
import shirt3Img from "./assets/shirt3.png";
import shirt4Img from "./assets/shirt4.png";
import shirt5Img from "./assets/shirt5.png";
import Button from "../../components/Button";
const Preview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const imgList = [shirt1Img, shirt2Img, shirt3Img, shirt4Img, shirt5Img];
  const colorList = ["pink", "brown", "purple", "green"];
  const sizeList = ["XS", "S", "M", "L", "XL", "XXL"];
  const [mainImage, setMainImage] = useState(shirt1Img);
  const [color, setColor] = useState(colorList[0]);
  const [size, setSize] = useState(sizeList[0]);
  const [amount, setAmount] = useState(1);
  console.log("amount", amount);
  console.log(id);
  const handleClickPreviewImg = (e) => {
    const ele = e.target;
    setMainImage(ele.src);
    const images = document.querySelectorAll(".images");
    images.forEach((img) => {
      if (img.src === ele.src) {
        img.classList.add("checked");
      } else if (img.classList.contains("checked")) {
        img.classList.remove("checked");
      }
    });
  };

  const handleClickColor = (e) => {
    const ele = e.target;
    const eleColor = ele.style.backgroundColor;
    setColor(eleColor);
    const colors = document.querySelectorAll(".colors");
    colors.forEach((clr) => {
      if (clr.style.backgroundColor === eleColor) {
        clr.classList.add("checked");
      } else if (clr.classList.contains("checked")) {
        clr.classList.remove("checked");
      }
    });
  };

  const handleClickSize = (e) => {
    const sizeValue = e.target.innerHTML;
    setSize(sizeValue);
    const sizes = document.querySelectorAll(".sizes");
    sizes.forEach((s) => {
      if (s.innerHTML === sizeValue) {
        s.classList.add("checked");
      } else if (s.classList.contains("checked")) {
        s.classList.remove("checked");
      }
    });
  };

  return (
    <div className="preview">
      <div className="container">
        <div className="wrapper">
          <div className="left-wrapper">
            <section className="preview-img">
              <div className="others-img">
                {imgList?.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    className={`images ${idx === 0 && "checked"}`}
                    alt="others"
                    onClick={(e) => handleClickPreviewImg(e)}
                  />
                ))}
              </div>
              <div className="main-img">
                <img src={mainImage} alt="main" />
              </div>
            </section>
            <article className="detail">
              <p className="about">เกี่ยวกับสินค้า</p>
              <p>
                รหัสสินค้า
                <br />
                455360
              </p>
            </article>
          </div>
          <div className="right-wrapper">
            <div className="info">
              <h1 className="name">เสื้อเชิ้ตสะเอิ้ดเบิ้ดเดิ้ด</h1>
              <p className="price">THB 250.00</p>
              <p className="description">
                ผ้าคอสตอน 100% ใช้งานได้ยาวนาน
                ไอเทมคู่ใจประจำตู้เสื้อผ้าใส่ได้หลายโอกาส
              </p>
            </div>
            <div className="color-list">
              {colorList?.map((color, idx) => (
                <div
                  key={idx}
                  className={`colors ${idx === 0 && "checked"}`}
                  style={{ backgroundColor: color }}
                  onClick={(e) => handleClickColor(e)}
                ></div>
              ))}
            </div>
            <div className="size-list">
              {sizeList?.map((size, idx) => (
                <div
                  key={idx}
                  className={`sizes ${idx === 0 && "checked"}`}
                  onClick={(e) => handleClickSize(e)}
                >
                  {size}
                </div>
              ))}
            </div>
            <Button isPrimary={false} text="ความยาวที่แนะนำเทียบกับส่วนสูง" />
            <div className="amount-field">
              <label htmlFor="amount">จำนวน</label>
              <br />
              <select
                id="amount"
                className="amount-select"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              >
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

            <Button
              isPrimary={true}
              text="เพิ่มลงในตะกร้า"
              action={() => navigate("/cart")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
