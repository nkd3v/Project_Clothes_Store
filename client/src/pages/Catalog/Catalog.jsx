import React from "react";
import { useParams } from "react-router-dom";
import Dropdown from "./components/Dropdown";
import "./catalog.css";
import shirtImg from "./assets/shirt.png";
import ProductCard from "./components/ProductCard";

const Catalog = () => {
  const listDropdown = [
    {
      header: "เสื้อ",
      items: [
        "เสื้อทั้งหมด",
        "เสื้อยืด(แขนสั้น)",
        "เสื้อยืด(แขนยาว)",
        "เสื้อโปโล",
        "เสื้อกันหนาว",
        "เสื้อเชิ้ดลำลอง(แขนยาว)",
        "เสื้อเชิ้ดลำลอง(แขนสั้น)",
        "เสื้อเชิ้ดทางการ",
      ],
    },
    {
      header: "กางเกง",
      items: [
        "กางเกงทั้งหมด",
        "กางเกงยืด(แขนสั้น)",
        "กางเกงยืด(แขนยาว)",
        "กางเกงโปโล",
        "กางเกงกันหนาว",
        "กางเกงเชิ้ดลำลอง(แขนยาว)",
        "กางเกงเชิ้ดลำลอง(แขนสั้น)",
        "กางเกงเชิ้ดทางการ",
      ],
    },
    {
      header: "ชุดลำลอง",
      items: [
        "ชุดลำลองทั้งหมด",
        "ชุดลำลองยืด(แขนสั้น)",
        "ชุดลำลองยืด(แขนยาว)",
        "ชุดลำลองโปโล",
        "ชุดลำลองกันหนาว",
        "ชุดลำลองเชิ้ดลำลอง(แขนยาว)",
        "ชุดลำลองเชิ้ดลำลอง(แขนสั้น)",
        "ชุดลำลองเชิ้ดทางการ",
      ],
    },
  ];
  const listProduct = [
    {
      id: 0,
      image: shirtImg,
      colorList: ["pink"],
      name: "เสื้อยืดคอกลม Mickey Mouse",
      gender: "ผู้ชาย",
      size: "XS-2XL",
      storeName: "ร้าน xbit",
      price: "999.00",
    },
    {
      id: 1,
      image: shirtImg,
      colorList: ["pink"],
      name: "เสื้อยืดคอกลม Mickey Mouse",
      gender: "ผู้ชาย",
      size: "XS-2XL",
      storeName: "ร้าน picpic",
      price: "999.00",
    },
    {
      id: 2,
      image: shirtImg,
      colorList: ["pink"],
      name: "เสื้อยืดคอกลม Mickey Mouse",
      gender: "ผู้ชาย",
      size: "XS-2XL",
      storeName: "ร้าน picpic",
      price: "999.00",
    },
    {
      id: 3,
      image: shirtImg,
      colorList: ["pink"],
      name: "เสื้อยืดคอกลม Mickey Mouse",
      gender: "ผู้ชาย",
      size: "XS-2XL",
      storeName: "ร้าน picpic",
      price: "999.00",
    },
  ];
  const { typeCatalog } = useParams();
  console.log(typeCatalog);
  return (
    <div className="catalog">
      <div className="container">
        <aside className="aside-bar">
          <h1 className="catalog-type">MEN</h1>
          {listDropdown?.map((dropdown, idx) => (
            <Dropdown
              key={idx}
              header={dropdown.header}
              items={dropdown.items}
              id={idx}
            />
          ))}
        </aside>
        <section className="list-products">
          {listProduct?.map((product) => (
            <ProductCard key={product.id} productObj={product} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Catalog;
