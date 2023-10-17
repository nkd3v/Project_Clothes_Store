import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = ({ setIsAuth }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const postalCode = e.target.postcode.value;
    const dateOfBirth = e.target.birthDate.value;
    const gender = e.target.gender.value;
    const role = e.target.role.value;
    const currentDate = new Date();
    const inputDate = new Date(dateOfBirth);
    if (!isValidEmail(email)) {
      alert("Invalid email");
      return;
    }
    if (!isValidPostalCode(postalCode)) {
      alert("Invalid postal codes");
      return;
    }

    if (inputDate > currentDate) {
      alert("Invalid Date");
      return;
    }

    const registerData = {
      username: username,
      password: password,
      email: email,
      postalCode: postalCode,
      dateOfBirth: dateOfBirth,
      gender: gender,
      role: role,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
          credentials: "include",
        }
      );

      if (response.ok) {
        const { token } = await response.json();
        console.log(
          "Register successful. You can do authenticated operation now"
        );
        setIsAuth(token);
        navigate("/");
      } else {
        const errorResponse = await response.json(); // Parse the error response
        if (errorResponse && errorResponse.error) {
          alert("Error: " + errorResponse.error); // Display the error message
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during login.");
    }
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    function isValidPostalCode(postalCode) {
      const postalCodeRegex = /^\d{5}$/;
      return postalCodeRegex.test(postalCode);
    }
  };
  return (
    <div className="RegisterPage">
      <h1>สร้างบัญชีผู้ใช้ใหม่</h1>
      <div className="InfoBox">
        <p>
          คุณจะได้รับอีเมลยืนยันทางอีเมลที่ได้กรอกไว้ด้านล่าง
          กรุณาตรวจสอบในกล่องจดหมายของคุณ
        </p>

        <form onSubmit={handleSubmitRegister}>
          <div className="Email Info">
            <div className="Info_text">
              <h3>อีเมล *</h3>
            </div>
            <input
              className="Input_Box"
              type="text"
              placeholder="กรอกอีเมลที่ใช้งาน"
              name="email"
              required
            />
          </div>
          <div className="Username Info">
            <div className="Info_text">
              <h3>username *</h3>
            </div>
            <input
              className="Input_Box"
              type="text"
              placeholder="กรอก username ที่ต้องการใช้งาน"
              name="username"
              required
            />
          </div>
          <div className="Password Info">
            <div className="Info_text">
              <h3>รหัสผ่าน *</h3>
            </div>
            <input
              className="Input_Box"
              type={showPassword ? "text" : "password"}
              placeholder="กรอกรหัสผ่าน"
              name="password"
              required
            />
          </div>
          <div className="ShowPassword Info">
            <div className="checkbox_">
              <input
                className="check_box"
                type="checkbox"
                onChange={() => setShowPassword((prev) => !prev)}
              />
            </div>
            <p>แสดงรหัสผ่าน</p>
          </div>
          <div className="PostNo Info">
            <div className="Info_text">
              <h3>รหัสไปรษณีย์ *</h3>
            </div>
            <input
              className="Input_Box"
              type="text"
              placeholder="กรอกรหัสไปรษณีย์"
              name="postcode"
              required
            />
          </div>
          <div className="BirthDate Info">
            <div className="Info_text">
              <h3>วันเกิด *</h3>
            </div>
            <input
              className="Date_Box"
              type="date"
              placeholder="dd-mm-yyyy"
              name="birthDate"
              onChange={(e) => console.log(e.target.value)}
              required
            />
          </div>
          <div className="Sex Info">
            <div className="Info_text">
              <h3>เพศ *</h3>
            </div>
            <div className="Sex_Chooser radio_btn_group">
              <div className="radio_btn">
                <input type="radio" name="gender" value="ชาย" required />
                <label htmlFor="ชาย">ชาย</label>
              </div>

              <div className="radio_btn">
                <input type="radio" name="gender" value="หญิง" required />
                <label htmlFor="หญิง">หญิง</label>
              </div>
            </div>
          </div>
          <div className="BuyOrSell Info">
            <div className="Info_text">
              <h3>คุณต้องการที่จะ *</h3>
            </div>
            <div className="BuyOrSell_Chooser radio_btn_group">
              <div className="radio_btn">
                <input type="radio" name="role" value="ซื้อ" required />
                <label htmlFor="ซื้อ">ซื้อ</label>
              </div>

              <div className="radio_btn">
                <input type="radio" name="role" value="ขาย" required />
                <label htmlFor="ขาย">ขาย</label>
              </div>
            </div>
          </div>
          <div className="Info">
            <button type="submit" className="Register_btn">
              สร้างบัญชี
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
