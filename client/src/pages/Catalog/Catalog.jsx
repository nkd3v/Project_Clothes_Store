import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dropdown from "./components/Dropdown";
import "./catalog.css";
import ProductCard from "./components/ProductCard";

const Catalog = () => {
  const [hierarchyCustomer, setHierarchyCustomer] = useState([]);
  const [products, setProducts] = useState([]);
  const { typeCatalog } = useParams();
  const [category, setCategory] = useState("");
  console.log(typeCatalog);

  const mapTypeCatalogToIndex = {
    men: 0,
    women: 1,
    kids: 2,
    baby: 3,
  };
  const index = mapTypeCatalogToIndex[typeCatalog];

  useEffect(() => {
    const fetchKindOfProduct = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/categories/hierarchy-for-customer"
        );

        if (response.ok) {
          const _res = await response.json();
          console.log(_res);
          setHierarchyCustomer(_res);
          console.log("hie", hierarchyCustomer);
        } else {
          alert(
            "Fetch hierarchy customer failed. Server returned an error: " +
              response.status
          );
        }
      } catch (err) {
        console.error("error when fetch catalog: ", err);
      }
    };
    fetchKindOfProduct();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/products?keywords=${typeCatalog}&category=${category}`
        );

        if (response.ok) {
          const _res = await response.json();
          console.log(_res);
          setProducts(_res);
        } else {
          alert(
            "Fetch products customer failed. Server returned an error: " +
              response.status
          );
        }
      } catch (err) {
        console.error("error: ", err);
      }
    };
    getProducts();
  }, [category, typeCatalog]);

  // const listProduct = [
  //   {
  //     id: 0,
  //     image: shirtImg,
  //     colorList: ["pink"],
  //     name: "เสื้อยืดคอกลม Mickey Mouse",
  //     gender: "ผู้ชาย",
  //     size: "XS-2XL",
  //     storeName: "ร้าน xbit",
  //     price: "999.00",
  //   },
  //   {
  //     id: 1,
  //     image: shirtImg,
  //     colorList: ["pink"],
  //     name: "เสื้อยืดคอกลม Mickey Mouse",
  //     gender: "ผู้ชาย",
  //     size: "XS-2XL",
  //     storeName: "ร้าน picpic",
  //     price: "999.00",
  //   },
  //   {
  //     id: 2,
  //     image: shirtImg,
  //     colorList: ["pink"],
  //     name: "เสื้อยืดคอกลม Mickey Mouse",
  //     gender: "ผู้ชาย",
  //     size: "XS-2XL",
  //     storeName: "ร้าน picpic",
  //     price: "999.00",
  //   },
  //   {
  //     id: 3,
  //     image: shirtImg,
  //     colorList: ["pink"],
  //     name: "เสื้อยืดคอกลม Mickey Mouse",
  //     gender: "ผู้ชาย",
  //     size: "XS-2XL",
  //     storeName: "ร้าน picpic",
  //     price: "999.00",
  //   },
  // ];

  return (
    <div className="catalog">
      <div className="container">
        <aside className="aside-bar">
          <h1 className="catalog-type">{hierarchyCustomer[index]?.name}</h1>
          {hierarchyCustomer[index]?.items?.map((dropdown, idx) => (
            <Dropdown
              key={idx}
              name={dropdown.name}
              items={dropdown.items}
              id={idx}
              setCategory={setCategory}
            />
          ))}
        </aside>
        <section className="list-products">
          {products?.map((product) => (
            <ProductCard key={product.id} productObj={product} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Catalog;
