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
          `${import.meta.env.VITE_API_URL}/api/v1/products/owned`,
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
        <h1 id="ProductCount">{products?.length} Products</h1>
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
      {products?.length === 0 ? (
        <h1 className="no-product">ยังไม่มีสินค้าตอนนี้</h1>
      ) : (
        <Merchandise
          products={products}
          length={products?.length}
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default MyStore;
