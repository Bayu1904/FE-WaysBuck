// import { useContext } from 'react'
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
// import { UserContext } from './CreateContext'
import { UserContext } from "./CreateContext";

const AdminRoute = ({ element: component, ...rest }) => {
  // const [state] = useContext(UserContext)
  // const isLogin = state.isLogin
  // const isAdmin = state.isAdmin

  // console.log(`ini admin ${isAdmin}, dan  ini Login ${isLogin}`);
  const [state] = useContext(UserContext);
  const isCekLogin = state.isLogin;

  // const login = isCekLogin.map((item, index) => {
  //     console.log(item.isAdmin);
  //     // if (item.isAdmin = true) {
  //     //     return isAdmin = true
  //     // }
  // })

  // console.log("ini element ", login)
  return isCekLogin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
