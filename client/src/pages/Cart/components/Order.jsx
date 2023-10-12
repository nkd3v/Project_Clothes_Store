import React from "react";
import "./order.css";

const Order = ({ item, getTotalOrder, setTotalPrice }) => {
  const handleChangeQuantity = async (e) => {
    const value = e.target.value || 0;
    console.log("myValue", value);
    const productData = {
      productVariantId: item?.ProductVariant?.id,
      quantity: parseInt(value),
    };
    console.log("pd", productData);
    try {
      const response = await fetch(`http://localhost:3000/api/v1/carts/set`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
        credentials: "include",
      });
      if (response.ok) {
        const _res = await response.json();
        // window.location.reload(false);
        console.log(_res);
        getTotalOrder();
        setTotalPrice();
      } else {
        console.error(
          "Set product customer failed. Server returned an error: " +
            response.status
        );
      }
    } catch (err) {
      console.error("error: ", err);
    }
  };
  return (
    <div className="order">
      <img
        src={`http://localhost:3000/api/v1/uploads/${item?.ProductVariant?.imageUrl}`}
        alt=""
      />
      <div className="info">
        <p className="name">{item?.ProductVariant?.Product?.name}</p>
        <p className="code">รหัสสินค้า: {item?.ProductVariant?.id}</p>
        <p className="color">สี : {item?.ProductVariant?.colorName}</p>
        <p className="size">ขนาด : {item?.ProductVariant?.size}</p>
        <p className="price">THB {item?.ProductVariant?.price}</p>

        <label htmlFor="amount-select">จำนวน</label>
        <select
          id="amount-select"
          value={item?.quantity}
          style={{ padding: ".5rem 1rem", marginLeft: "1rem" }}
          onChange={(e) => handleChangeQuantity(e)}
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

      <button className="cancel-btn" onClick={handleChangeQuantity}>
        <i className="fa-solid fa-x"></i>
      </button>
    </div>
  );
};

export default Order;
