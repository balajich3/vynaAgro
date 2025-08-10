// src/pages/Products.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { useCart } from "../context/CartContext"; // ✅ Import cart context

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart(); // ✅ Access addToCart from context

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="product-list" style={{ padding: "20px" }}>
      <h2>Our Products</h2>
      <div
        className="product-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map((p) => (
            <div
              key={p._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                textAlign: "center",
                background: "#fff",
              }}
            >
              <Link
                to={`/product/${p._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <h3>{p.name}</h3>
                <p>₹{p.price}</p>
              </Link>
              <button
                onClick={() => addToCart(p)} // ✅ Now adds to cart context
                style={{
                  marginTop: "10px",
                  padding: "8px 12px",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
