import "./styles/app.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./Navbar";
import Login from "./pages/Login/Login";
import Error from "./pages/Error/Error";
import { useEffect, useState } from "react";
import Catalog from "./pages/Catalog/Catalog";
import Preview from "./pages/Preview/Preview";
import Cart from "./pages/Cart/Cart";
import Payment from "./pages/Payment/Payment";
import Cookies from "js-cookie";
import StatusOrder from "./pages/StatusOrder/StatusOrder";
import Register from "./pages/Register/Register";
import MyOrder from "./pages/MyOrder/MyOrder";
import MyStore from "./pages/MyStore/MyStore";
import Additem from "./pages/Additem/Additem";

function App() {
  const { pathname } = useLocation();
  const [isLoginState, setIsLoginState] = useState(false);
  const [totalOrder, setTotalOrder] = useState(0);
  const [role, setRole] = useState("");
  const [isAuth, setIsAuth] = useState(Cookies.get("auth_token"));
  console.log(isAuth);
  console.log("role", role);
  let isMount = true;
  console.log("totalOrder", totalOrder);

  const getTotalOrder = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/carts/products",
        { credentials: "include" }
      );
      if (response.ok) {
        const productInCart = await response.json();
        const total = productInCart?.cartItems?.reduce(
          (total, { quantity }) => total + quantity,
          0
        );
        setTotalOrder(total);
      } else {
        console.error(
          "Get total order in cart failed. Server returned an error: " +
            response.status
        );
        setTotalOrder(0);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (!isMount) return;
    pathname === "/login" ? setIsLoginState(true) : setIsLoginState(false);
    window.scrollTo(0, 0);
    return () => {
      isMount = false;
    };
  }, [pathname]);

  useEffect(() => {
    if (!isAuth) {
      setTotalOrder(0);
      return;
    }
    getUserInfo();
    getTotalOrder();
  }, [isAuth]);

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
        setRole(role);
      } else {
        alert("Login failed. Server returned an error: " + response.status);
      }
    } catch (error) {
      console.error("Error get user info:", error);
    }
  }

  return (
    <div className="app">
      <Navbar
        isLoginState={isLoginState}
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        totalOrder={totalOrder}
        role={role}
        setRole={setRole}
      />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/login"
          element={<Login setIsAuth={setIsAuth} setRole={setRole} />}
        ></Route>
        <Route
          path="/register"
          element={<Register setIsAuth={setIsAuth} setRole={setRole} />}
        ></Route>
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />}></Route>
        <Route path="/Register" element={<Register />}></Route>
        <Route path="/additems" element={<Additem />}></Route>
        <Route path="/catalog/:typeCatalog" element={<Catalog />}></Route>
        <Route
          path="/product/preview/:id"
          element={<Preview getTotalOrder={getTotalOrder} />}
        ></Route>
        <Route
          path="/cart"
          element={
            <Cart
              totalOrder={totalOrder}
              setTotalOrder={setTotalOrder}
              getTotalOrder={getTotalOrder}
            />
          }
        ></Route>
        <Route
          path="/payment"
          element={<Payment getTotalOrder={getTotalOrder} />}
        ></Route>
        <Route path="/status" element={<StatusOrder />}></Route>
        <Route path="/*" element={<Error />}></Route>
        <Route path="/my-store" element={<MyStore />}></Route>
        <Route path="/my-order" element={<MyOrder />}></Route>
      </Routes>
    </div>
  );
}

export default App;
