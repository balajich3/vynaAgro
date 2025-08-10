import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const role = localStorage.getItem("role");

  if (role === "admin") {
    return children;
  } else {
    // Redirect non-admin users to login or unauthorized page
    return <Navigate to="/login" />;
  }
};

export default AdminRoute;
