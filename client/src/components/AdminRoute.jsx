// src/components/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const role = localStorage.getItem("role");
  if (role === "admin") {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default AdminRoute;
