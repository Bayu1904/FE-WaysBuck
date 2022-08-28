// dependencies
import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { API, setAuthToken } from "./config/api";
import { UserContext } from "./utils/CreateContext";

// style
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/Topping/StyleToping.css";

// pages
import LandingPage from "./pages/Landingpages";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import AddProduct from "./pages/addProduct/AddProduct";
import AddToping from "./pages/addProduct/AddTopping";
import Income from "./components/Income";
import Detail from "./pages/Detail";

// untuk pengecekan token isLogin true/false
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();

  // Init user context here ...
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    // Redirect Auth
    if (state.isLogin === false) {
      navigate("/");
    } else {
      if (state.user.status === "admin") {
        navigate("/income");
      } else if (state.user.status === "customer") {
        navigate("/");
      }
    }
  },[state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "LOGIN_USER",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  },[]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/income" element={<Income />} />
      <Route path="/addToping" element={<AddToping />} />
      <Route path="/addProduct" element={<AddProduct />} />
    </Routes>
  );
}

export default App;
