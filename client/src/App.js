import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import AdminProducts from "./pages/AdminProducts";
import AddressPage from "./pages/AddressPage";
import PaymentPage from "./pages/PaymentPage";
import OrderSuccess from "./pages/OrderSuccess";

import AdminRoute from "./components/AdminRoute";

const App = () => {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/address" element={<AddressPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Admin protected routes */}
          <Route
            path="/add-product"
            element={
              <AdminRoute>
                <AddProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <AdminRoute>
                <EditProduct />
              </AdminRoute>
            }
          />
        </Routes>
        <Footer />
      </>
    </Router>
  );
};

export default App;
