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

function App() {
  const { pathname } = useLocation();
  const [isLoginState, setIsLoginState] = useState(false);
  let isMount = true;
  useEffect(() => {
    if (!isMount) return;
    pathname === "/login" ? setIsLoginState(true) : setIsLoginState(false);
    window.scrollTo(0, 0);
    return () => {
      isMount = false;
    };
  }, [pathname]);

  return (
    <div className="app">
      <Navbar isLoginState={isLoginState} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/catalog/:typeCatalog" element={<Catalog />}></Route>
        <Route path="/product/preview/:id" element={<Preview />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/*" element={<Error />}></Route>
      </Routes>
    </div>
  );
}

export default App;
