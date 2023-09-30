import React from "react";
import "./login.css";

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log("email", email, "\npassword", password);
  };
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
                <label htmlFor="email">
                  อีเมล <span>*</span>
                </label>
                <input
                  name="email"
                  id="email"
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
            <button className="btn">สร้างบัญชีผู้ใช้ใหม่</button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Login;
