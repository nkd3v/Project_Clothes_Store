import React from "react";
import "./home.css";
import Button from "../../components/Button";
const Home = () => {
  return (
    <div className="home">
      <section className="banner parallax">
        <div className="overlay">
          <div className="banner-content">
            <h1 className="title">Discover the perfect style for you</h1>
            <p className="describe">
              เสื้อผ้าที่หลากหลายที่เหมาะ สำหรับคุณและคนในครอบครัว
            </p>

            <Button
              text="เพิ่มเติม"
              isPrimary={true}
              action={() => console.log("Click button")}
            />
          </div>
        </div>
      </section>
      <section className="banner parallax">
        <div className="overlay">
          <div className="banner-content">
            <h1 className="title">
              Paint your wardrobe with a rainbow of possibilities
            </h1>
            <p className="describe">
              โทนสีเสื้อผ้าที่สามารถเลือกได้หลากหลาย ตามสไตล์ของตัวคุณเอง
            </p>
            <Button
              text="เพิ่มเติม"
              isPrimary={true}
              action={() => console.log("Click button")}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
