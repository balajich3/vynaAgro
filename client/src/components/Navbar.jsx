import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName") || "User";
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/vynaLogo.avif" alt="logo" className="navbar-logo" />
        <h2>VYNA AGRO</h2>
      </div>

      <div className="navbar-right">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact Us</Link>

        {token ? (
          <>
            <span className="welcome-text">Hi, {userName}</span>
            {/* Show Add Product only for admin */}
            {role === "admin" && <Link to="/add-product">Add Product</Link>}
            <Link to="/cart" className="font-medium text-lg hover:text-green-600">Cart</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/cart" className="font-medium text-lg hover:text-green-600">Cart</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
