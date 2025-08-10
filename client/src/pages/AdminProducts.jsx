import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin - Manage Products</h2>
      <button 
        onClick={() => navigate("/add-product")} 
        style={{
          padding: "10px 15px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          marginBottom: "20px"
        }}
      >
        Add New Product
      </button>
      <div 
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px"
        }}
      >
        {products.map((p) => (
          <div 
            key={p._id} 
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center"
            }}
          >
            <img 
              src={p.image} 
              alt={p.name} 
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <button 
              onClick={() => handleEdit(p._id)} 
              style={{
                padding: "5px 10px",
                backgroundColor: "#ffc107",
                border: "none",
                borderRadius: "5px",
                marginRight: "5px"
              }}
            >
              Edit
            </button>
            <button 
              onClick={() => handleDelete(p._id)} 
              style={{
                padding: "5px 10px",
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "5px"
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
