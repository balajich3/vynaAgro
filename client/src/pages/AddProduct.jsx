import React, { useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    type: "Solid",
    price: "",
    weight: "",
    image: "",
  });

  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProduct((prev) => ({ ...prev, image: reader.result }));
        setPreview(reader.result);
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     await axios.post("http://localhost:5000/api/products", product); 
      alert("Product added!");
      navigate("/dashboard");
    } catch (err) {
      alert("Failed to add product");
      console.error("Error adding product:", err);
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            required
          />
          <select name="type" value={product.type} onChange={handleChange}>
            <option value="Solid">Solid</option>
            <option value="Powdered">Powdered</option>
            <option value="Liquid">Liquid</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            name="weight"
            placeholder="Weight (e.g. 500g or 1kg)"
            value={product.weight}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price (₹)"
            value={product.price}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            required
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{ width: "100px", height: "100px", marginTop: "10px" }}
            />
          )}
          <button type="submit">Upload Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
