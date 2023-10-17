import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dropdown from "./components/Dropdown";
import "./catalog.css";
import ProductCard from "./components/ProductCard";
import SearchBar from "./components/SearchBar";
import Button from "../../components/Button";
import Loading from "../../components/Loading";

const Catalog = () => {
  const [hierarchyCustomer, setHierarchyCustomer] = useState([]);
  const [products, setProducts] = useState([]);
  const { typeCatalog } = useParams();
  const [category, setCategory] = useState("");
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [isLoading, setIsLoading] = useState(false);

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
          `${import.meta.env.VITE_API_URL}/api/v1/categories/hierarchy-for-customer`
        );

        if (response.ok) {
          const _res = await response.json();
          console.log(_res);

          setHierarchyCustomer(_res);
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
    setCategory("");
    setSearchWord("");

    setColors([]);
    setSizes([]);
  }, [typeCatalog]);

  useEffect(() => {
    const getProducts = async () => {
      const paramCategory = category ? `&category=${category}` : "";
      const paramColors = colors
        ? colors.map((color) => `&colors=${color.toUpperCase()}`).join("")
        : "";
      const paramSize = sizes
        ? sizes.map((size) => `&sizes=${size}`).join("")
        : "";
      const paramMinPrice = minPrice ? `&minPrice=${minPrice}` : "";
      const paramMaxPrice = maxPrice ? `&maxPrice=${maxPrice}` : "";
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/products?gender=${typeCatalog.toUpperCase()}${paramCategory}${paramColors}${paramSize}${paramMinPrice}${paramMaxPrice}&keywords=${searchWord}`
        );

        if (response.ok) {
          const _res = await response.json();
          console.log(_res);
          window.scrollTo(0, 0);
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
      setIsLoading(false);
    };
    getProducts();
  }, [category, colors, sizes, typeCatalog, searchWord, minPrice, maxPrice]);

  const handlePrice = () => {
    const minPrice = document.getElementById("min-price").value;
    const maxPrice = document.getElementById("max-price").value;
    if (!/^(\d*)$/.test(minPrice) || !/^(\d*)$/.test(maxPrice)) {
      alert("Invalid filter price");
      return;
    }
    if (minPrice > maxPrice) {
      alert("min must less than max price");
      return;
    }
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
  };

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
              itemStyle="category"
              id={idx}
              callBack={setCategory}
            />
          ))}
          <hr className="separate-line" />
          <Dropdown
            type="optional"
            name="ขนาด"
            items={["XS", "S", "M", "L", "XL", "XXL", "3XL"]}
            itemStyle="size"
            id="size"
            callBack={setSizes}
          />
          <Dropdown
            type="optional"
            name="สี"
            items={[
              "white",
              "gray",
              "black",
              "red",
              "blue",
              "green",
              "yellow",
              "pink",
              "purple",
              "orange",
              "brown",
              "beige",
            ]}
            itemStyle="color"
            id="color"
            callBack={setColors}
          />
          <label className="price" htmlFor="min-price">
            ช่วงราคา
          </label>
          <div className="input-field">
            <input type="number" id="min-price" placeholder="MIN" min="0" />
            <hr className="between" />
            <input type="number" id="max-price" placeholder="MAX" min="0" />
          </div>
          <div className="btn-price-wrapper">
            <Button
              text="APPLY"
              isPrimary={true}
              type="button"
              action={handlePrice}
            />
          </div>
        </aside>
        <div className="wrapper">
          <SearchBar setSearchWord={setSearchWord} />

          <section className="list-products">
            {isLoading ? (
              <Loading />
            ) : (
              products?.map((product) => (
                <ProductCard key={product.id} productObj={product} />
              ))
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
