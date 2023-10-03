import React, { useEffect, useState } from "react";
import "./preview.css";
import { useNavigate, useParams } from "react-router-dom";
import shirt1Img from "./assets/shirt1.png";
import shirt2Img from "./assets/shirt2.png";
import shirt3Img from "./assets/shirt3.png";
import shirt4Img from "./assets/shirt4.png";
import shirt5Img from "./assets/shirt5.png";
import Button from "../../components/Button";
import { convertRGB } from "./utils/convertRGB";
const Preview = ({ getTotalOrder }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const imgList = [shirt1Img, shirt2Img, shirt3Img, shirt4Img, shirt5Img];
  // const colorList = ["pink", "brown", "purple", "green"];
  // const sizeList = ["XS", "S", "M", "L", "XL", "XXL"];
  const [mainImage, setMainImage] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState();
  const [product, setProduct] = useState([]);
  const [listColor, setListColor] = useState([]);

  useEffect(() => {
    const colorSet = new Set(
      product?.ProductVariants?.map((variant) => variant.color)
    );

    // Convert the Set back to an array if needed
    const colorList = Array.from(colorSet);
    setListColor(colorList);
  }, [product]);

  const handleAddProduct = async () => {
    const [validVariant] = product.ProductVariants?.filter(
      (pv) => pv.size === size && pv.color === color
    );
    console.log(validVariant);

    const productData = {
      productVariantId: validVariant?.id,
      quantity: parseInt(amount),
    };
    console.log("pd", productData);
    try {
      const response = await fetch(`http://localhost:3000/api/v1/carts/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
        credentials: "include",
      });
      if (response.ok) {
        const _res = await response.json();
        console.log(_res);
        getTotalOrder();
      } else {
        console.error(
          "Add product customer failed. Server returned an error: " +
            response.status
        );
        navigate("/login");
      }
    } catch (err) {
      console.error("error: ", err);
    }
  };
  console.log("amount", amount);
  console.log(id);
  // console.log("color", color);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/products/${id}`
        );

        if (response.ok) {
          const _res = await response.json();
          console.log(_res);
          setProduct(_res);
          setColor(_res?.ProductVariants[0]?.color);
          // setSize(_res?.ProductVariants[0]?.size);
          setMainImage(
            `http://localhost:3000/api/v1/uploads/${_res?.ProductVariants[0]?.imageUrl}`
          );
        } else {
          alert(
            "Fetch preview product customer failed. Server returned an error: " +
              response.status
          );
        }
      } catch (err) {
        console.error("error: ", err);
      }
    };
    getProduct();
  }, []);

  useEffect(() => {
    product?.ProductVariants?.map((pv) => {
      if (pv.color === color && pv.size === size) {
        setPrice(pv?.price);
      }
    });
  }, [size, color]);

  const handleClickPreviewImg = (e) => {
    const ele = e.target;
    console.log(ele.src);
    setMainImage(ele.src);
    const images = document.querySelectorAll(".images");
    console.log(images);
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
    console.log("eleCOlor", eleColor);
    const hexColor = convertRGB(eleColor).toUpperCase();
    setColor(hexColor);
    setSize("");
    setPrice(null);
    console.log(hexColor);
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
                {product?.ProductVariants?.map((pv, idx) => (
                  <img
                    key={idx}
                    src={`http://localhost:3000/api/v1/uploads/${pv.imageUrl}`}
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
                {product?.id}
              </p>
            </article>
          </div>
          <div className="right-wrapper">
            <div className="info">
              <h1 className="name">{product?.name}</h1>

              <p className="price">THB {price || "---"}</p>

              <p className="description">{product?.description}</p>
            </div>
            <div className="color-list">
              {listColor?.map((clr, idx) => (
                <div
                  key={idx}
                  className={`colors ${idx === 0 && "checked"}`}
                  style={{ backgroundColor: clr }}
                  onClick={(e) => handleClickColor(e)}
                ></div>
              ))}
            </div>
            <div className="size-list">
              {product?.ProductVariants?.map((pv, idx) => {
                if (pv.color === color) {
                  return (
                    <div
                      key={idx}
                      className="sizes"
                      onClick={(e) => handleClickSize(e)}
                    >
                      {pv?.size}
                    </div>
                  );
                }
              })}
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
              action={handleAddProduct}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
