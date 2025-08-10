// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext"; // ✅ Import cart context

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // ✅ Access cart function
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError("Product not found.");
      }
    };
    fetchProduct();
  }, [id]);

  if (error) return <h2>{error}</h2>;
  if (!product) return <h2>Loading...</h2>;

  const handleBuyNow = () => {
    addToCart(product); // ✅ Adds product to cart
    navigate("/cart"); // ✅ Redirect to cart page
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>{product.name}</h2>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "300px", height: "auto" }}
      />
      <p><strong>Type:</strong> {product.type}</p>
      <p><strong>Weight:</strong> {product.weight}</p>
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p><strong>Description:</strong> {product.description}</p>

      <div style={{ marginTop: "20px" }}>
        <button
          className="px-4 py-2 mr-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={handleBuyNow}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
