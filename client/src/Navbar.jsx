import React from "react";
import "./styles/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "./assets/images/logo.png";
import cartIcon from "./assets/images/icon-cart.png";
import profileIcon from "./assets/images/icon-profile.png";
const Navbar = ({
  isLoginState,
  isAuth,
  setIsAuth,
  totalOrder,
  role,
  setRole,
}) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      const { message } = await response.json();
      console.log(message);
      setIsAuth(null);
      setRole(null);
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during logout.");
    }
  };
  return (
    <nav className="navbar">
      <div className="container flex">
        <div className="navbar-left  flex">
          <div className="logo-image">
            <Link to="/" className="link">
              <img src={logoImg} alt="logo" />
            </Link>
          </div>
          {!isLoginState &&
            (role === "ซื้อ" || role === "Customer" || !role) && (
              <ul className="lists flex">
                <li>
                  <Link to="/catalog/women" className="link">
                    WOMEN
                  </Link>
                </li>
                <li>
                  <Link to="/catalog/men" className="link">
                    MEN
                  </Link>
                </li>
                <li>
                  <Link to="/catalog/kids" className="link">
                    KIDS
                  </Link>
                </li>
                <li>
                  <Link to="/catalog/baby" className="link">
                    BABY
                  </Link>
                </li>
              </ul>
            )}
          {!isLoginState && role === "ขาย" && (
            <ul className="lists flex">
              <li>
                <Link to="/my-store" className="link">
                  สินค้าของฉัน
                </Link>
              </li>
              <li>
                <Link to="/my-order" className="link">
                  Order ของฉัน
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div className="navbar-right">
          {!isLoginState && (
            <ul className="lists flex">
              <li>
                {isAuth && (role === "ซื้อ" || role === "Customer") && (
                  <Link to="/cart" className="icon-link">
                    <div className="cart">
                      <p className={`show-total ${!totalOrder && "none"}`}>
                        {totalOrder}
                      </p>
                      <img src={cartIcon} alt="cart" />
                    </div>
                  </Link>
                )}
              </li>
              <li>
                {isAuth ? (
                  <i
                    className="fa-solid fa-right-from-bracket logout-icon"
                    onClick={handleLogout}
                  ></i>
                ) : (
                  <Link to="/login" className="icon-link">
                    <img src={profileIcon} alt="profile" />
                  </Link>
                )}
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
