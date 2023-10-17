import React from "react";
import "./merchandise.css";
const Merchandise = ({ products, length, page, setPage }) => {
  return (
    <div className="merchandise">
      <div className="Container">
        <header className="Header">
          <h3 className="Product">สินค้า</h3>
          <h3 className="Productselector">ตัวเลือกสินค้า</h3>
          <h3 className="Price">ราคา</h3>
          <h3 className="Stock">คลัง</h3>
          <h3 className="Sale">ยอดขาย</h3>
        </header>
        <section className="SalerProduct">
          <div className="Product_withPic">
            <img
              className="Product_Pic"
              src={`${import.meta.env.VITE_API_URL}/api/v1/uploads/${products[page]?.ProductVariants[0]?.imageUrl}`}
              alt="product"
            ></img>
            <h3>{products[page]?.name}</h3>
          </div>
          <div className="Color_Size">
            {products[page]?.ProductVariants?.map((pv, idx) => (
              <h4 className="Text" key={idx}>
                {pv?.colorName} {pv?.size}
              </h4>
            ))}
          </div>
          <div className="Price_Text">
            {products[page]?.ProductVariants?.map((pv, idx) => (
              <h4 className="Text" key={idx}>
                {pv?.price} THB
              </h4>
            ))}
          </div>
          <div className="Stock_Text">
            {products[page]?.ProductVariants?.map((pv, idx) => (
              <h4 className="Text" key={idx}>
                {pv?.quantity}
              </h4>
            ))}
          </div>
          <div className="Sold_Text">
            {products[page]?.ProductVariants?.map((pv, idx) => (
              <h4 className="Text" key={idx}>
                {pv?.soldCount}
              </h4>
            ))}
          </div>
        </section>
        <div className="page_selector">
          <div className="Arrow_Group">
            <p
              className="btn"
              onClick={() => {
                setPage((prev) => (prev > 0 ? prev - 1 : prev));
              }}
            >
              <i className="arrow left"></i>
            </p>
            <p className="Page_No">{page + 1}</p>
            <p
              className="btn"
              onClick={() => {
                setPage((prev) => (prev < length - 1 ? prev + 1 : prev));
              }}
            >
              <i className="arrow right"></i>
            </p>
          </div>
          <p>หน้าที่</p>
          <div className="PageSelector_Div">
            <p className="Max_Page_No">
              {page + 1}/{length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Merchandise;
