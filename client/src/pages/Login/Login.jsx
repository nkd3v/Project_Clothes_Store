import React from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    const loginData = {
      email: username,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
        credentials: "include",
      });
    
      if (response.ok) {
        const { token } = await response.json();
        console.log("Login successful. You can do authenticated operation now");
        getUserInfo();
        setIsAuth(token);
        navigate("/");
      } else {
        const errorResponse = await response.json();
        if (errorResponse && errorResponse.error) {
          alert(errorResponse.error);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during login.");
    }
  };

  async function getUserInfo() {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/user/get-user-info",
        {
          credentials: "include",
        }
      );

      if (response.ok) {
        const { role } = await response.json();
        console.log(
          "Get user info successful. You can do authenticated operation now"
        );
      } else {
        alert("Login failed. Server returned an error: " + response.status);
      }
    } catch (error) {
      console.error("Error get user info:", error);
    }
  }

  return (
    <div className="login">
      <div className="container">
        <div className="wrapper">
          <section className="login-form">
            <div className="top">
              <h1>เข้าสู่ระบบ</h1>
              <p>
                <span>โปรดระบุ *</span>
              </p>
            </div>
            <p>เข้าสู่ระบบด้วยอีเมลและรหัสผ่าน</p>
            <form onSubmit={handleLogin}>
              <div className="input-field">
                <label htmlFor="username">
                  อีเมล <span>*</span>
                </label>
                <input
                  name="username"
                  id="username"
                  type="text"
                  placeholder="กรุณากรอกอีเมลที่ใช้งาน"
                />
              </div>
              <div className="input-field">
                <label htmlFor="password">
                  รหัสผ่าน <span>*</span>
                </label>
                <input name="password" id="password" type="text" />
              </div>
              <button type="submit" className="submit-btn">
                เข้าสู่ระบบ
              </button>
              <p className="forget-password">ลืมรหัสผ่าน</p>
            </form>
          </section>
          <section className="register-form">
            <h1>สร้างบัญชีผู้ใช้ใหม่</h1>
            <p>
              สร้างบัญชีผู้ใช้ เพื่อการใช้งานที่สะดวก
              ชำระเงินได้รวดเร็วยิ่งขึ้น!
            </p>
            <button className="btn" onClick={() => navigate("/register")}>
              สร้างบัญชีผู้ใช้ใหม่
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Login;
