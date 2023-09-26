import React from "react";
import "./styles/navbar.css";
import { Link } from "react-router-dom";
import logoImg from "./assets/images/logo.png";
import cartIcon from "./assets/images/icon-cart.png";
import profileIcon from "./assets/images/icon-profile.png";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container flex">
        <div className="navbar-left  flex">
          <div className="logo-image">
            <Link to="/" className="link">
              <img src={logoImg} alt="logo" />
            </Link>
          </div>
          <ul className="lists flex">
            <li>
              <Link to="/women" className="link">
                WOMEN
              </Link>
            </li>
            <li>
              <Link to="/men" className="link">
                MEN
              </Link>
            </li>
            <li>
              <Link to="/kids" className="link">
                KIDS
              </Link>
            </li>
            <li>
              <Link to="/baby" className="link">
                BABY
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-right">
          <ul className="lists flex">
            <li>
              <Link to="/cart" className="icon-link">
                <img src={cartIcon} alt="cart" />
              </Link>
            </li>
            <li>
              <Link to="/login" className="icon-link">
                <img src={profileIcon} alt="profile" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
