import React from "react";
import "./MyStore.css"; 
const MyStore = () => {
  return <div className="SalerPage">
  <h1>
      สินค้าของฉัน
  </h1>
  <div className="PdCount_AndBTN">
      <h1 id="ProductCount">
          69 Products
      </h1>
      <div className="BTN_Group">
          <button type="button" className="AddP">+ เพิ่มสินค้า</button>
          
      </div>
  </div>
  <div className="Container">
      <div className="Header">
          <h3 className="Product">สินค้า</h3>
          <h3 className="Productselector">ตัวเลือกสินค้า</h3>
          <h3 className="Price">ราคา</h3>
          <h3 className="Stock">คลัง</h3>
          <h3 className="Sale">ยอดขาย</h3>
      </div>
      <div className="SalerProduct">
          
          <div className="Product_withPic">
              <img className="Product_Pic" src="http://localhost:3000/api/v1/uploads/shirt.png" alt="Italian Trulli"></img>
              <h3>เสื้อเชิ้ตสะเอิ้ดเบิ้ดเดิ้ด</h3>
          </div>
          <div className="Color_Size">
              <h4 className="Text">
                  Beige:XS,S,M,L,XL,XXL
              </h4>
              <h4 className="Text">
                  Brown:XS,S,M,L,XL,XXL
              </h4>
              <h4 className="Text">
                  Brown:XS,S,M,L,XL,XXL
              </h4>
              <h4 className="Text">
                  Brown:XS,S,M,L,XL,XXL
              </h4>
          </div>
          <div className="Price_Text">
              <h4 className="Text">
                  200 THB
              </h4>
              <h4 className="Text">
                  200 THB
              </h4>
              <h4 className="Text">
                  69 THB
              </h4>
              <h4 className="Text">
                  420 THB
              </h4>
          </div>
          <div className="Stock_Text">
              <h4 className="Text">
                  200
              </h4>
              <h4 className="Text">
                  200
              </h4>
              <h4 className="Text">
                  69
              </h4>
              <h4 className="Text">
                  420
              </h4>
          </div>
          <div className="Sold_Text">
              <h4 className="Text">
                  10
              </h4>
              <h4 className="Text">
                  1
              </h4>
              <h4 className="Text">
                  5
              </h4>
              <h4 className="Text">
                  50
              </h4>
          </div>

      </div>
      <div className="page_selector">
          <div className="Arrow_Group">
              <p><i className="arrow left"></i></p>
              <p className="Page_No">1</p>
              <p><i className="arrow right"></i></p>
          </div>
          <p>หน้าที่</p>
          <div className="PageSelector_Div">
              
              <p className="Max_Page_No">1/1</p>
          </div>
      </div>
  </div>

</div>;
};

export default MyStore;
