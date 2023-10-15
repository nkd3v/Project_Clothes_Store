import React from "react";
import "./additem.css";
import displayimg from "../../assets/images/uploadfield.png";

const Additem = () => {
  return (
    <div className="additem">
      <div className="div1">
        <h1>ลงขายสินค้า</h1>
      </div>
      <div className="container">
        <div className="wrapper">
          <section className="upload-form">
            <img src={displayimg} alt=""></img>
            <div className="input-field">
              <form className="uploadbtn">
                <input
                  className="upload-input"
                  type="file"
                  id="myFile"
                  name="filename"
                  accept="image/*"
                ></input>
                <input className="submitbtn" type="submit"></input>
              </form>
            </div>
          </section>

          <section className="additem-form">
            <div className="input-field">
              <label htmlFor="itemname">
                <h3>Name/ชื่อ</h3>
              </label>
              <input
                name="itemname"
                id="itemname"
                type="text"
                placeholder="ชื่อสินค้า"
              />
            </div>
            <br></br>

            <div className="input-field">
              <label htmlFor="password">
                <h3>Description/คำอธิบายสินค้า</h3>
              </label>
              <input
                name="description"
                id="description"
                type="text"
                placeholder="คำอธิบายสินค้า"
              />
            </div>
            <br></br>

            <div className="input-field">
              <label htmlFor="price">
                <h3>Price/ราคา</h3>
              </label>
              <input
                name="price"
                id="price"
                type="number"
                placeholder="ex. 250"
                min="0"
              />
            </div>
            <br></br>

            <div className="input-field">
              <h3>ประเภทสินค้า</h3>
              <div className="optionfield">
                <label className="optionlabel">
                  <select className="optionselect" id="category1" name="gender">
                    <option value="">Select a gender</option>
                    <option value="male">ชาย</option>
                    <option value="female">หญิง</option>
                  </select>
                </label>
                <label className="optionlabel">
                  <select
                    className="optionselect"
                    id="category2"
                    name="className"
                  >
                    <option value="">Select a class</option>
                    <option value="male">ชาย</option>
                    <option value="female">หญิง</option>
                    <option value="kid">เด็ก</option>
                    <option value="baby">เด็กทารก</option>
                  </select>
                </label>

                <label className="optionlabel">
                  <select
                    className="optionselect"
                    id="category3"
                    name="category"
                  >
                    <option value="">Select a category</option>
                    <option value="ltshirt">เสื้อยืด(เเขนยาว)</option>
                    <option value="stshirt">เสื้อยืด(เเขนสั้น)</option>
                    <option value="coat">เสื้อกันหนาว</option>
                    <option value="shirt">เสื้อเชิ้ต</option>
                  </select>
                </label>
              </div>
            </div>
            <br></br>

            <div className="input-field">
              <label htmlFor="tags">
                <h3>Tags (comma-separated)</h3>
              </label>
              <input type="text" id="tags" name="tags" required></input>
            </div>
            <br></br>

            <label htmlFor="variants">
              <h3>Variants</h3>
            </label>
            <button className="variantbtn" type="button" id="addVariant">
              Add Variant
            </button>
            <div id="variantFields">
              {/* <!-- Variant fields will be added here --> */}
            </div>

            <button className="btn">สร้างรายการสินค้า</button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Additem;
