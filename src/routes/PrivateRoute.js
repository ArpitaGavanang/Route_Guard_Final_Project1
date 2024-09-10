import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  const data = token !== null &&  token !== undefined;

  return data ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;