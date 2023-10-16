import React, { useEffect, useState } from "react";
import "./MyStore.css";
import Merchandise from "./components/Merchandise";
import { useNavigate } from "react-router-dom";
const MyStore = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const getOwnProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/products/owned",
          {
            credentials: "include",
          }
        );

        if (response.ok) {
          const { products: data } = await response.json();
          setProducts(data);
        } else {
          alert(
            "Get own product failed. Server returned an error: " +
              response.status
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getOwnProducts();
  }, []);
  return (
    <div className="SalerPage">
      <h1>สินค้าของฉัน</h1>
      <header className="PdCount_AndBTN">
        <h1 id="ProductCount">69 Products</h1>
        <div className="BTN_Group">
          <button
            type="button"
            className="AddP"
            onClick={() => navigate("/additems")}
          >
            + เพิ่มสินค้า
          </button>
        </div>
      </header>

      <Merchandise
        products={products}
        length={products?.length}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default MyStore;
