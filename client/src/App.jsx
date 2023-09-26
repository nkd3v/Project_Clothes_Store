import "./styles/app.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./Navbar";
import Login from "./pages/Login/Login";
import Error from "./pages/Error/Error";
import { useEffect } from "react";

function App() {
  const { pathname } = useLocation();
  let isMount = true;
  useEffect(() => {
    if (!isMount) return;
    window.scrollTo(0, 0);
    console.log("first");
    return () => {
      isMount = false;
    };
  }, [pathname]);

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/*" element={<Error />}></Route>
      </Routes>
    </div>
  );
}

export default App;
