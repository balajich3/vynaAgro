import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    type: "Solid",
    price: "",
    weight: "",
    image: "",
  });
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  // Fetch existing product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/products/${id}`); // relative URL, axiosInstance baseURL should be set
        setProduct(res.data);
        setPreview(res.data.image);
      } catch (err) {
        console.error("Failed to fetch product");
      }
    };
    fetchProduct();
  }, [id]);

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
      const token = localStorage.getItem("token");

      await axios.put(`/products/${id}`, product, {
        headers: {
          Authorization: `Bearer ${token}`,  // important for admin protected route
        },
      });

      alert("Product updated!");
      navigate("/products");
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to update product");
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <h2>Edit Product</h2>
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
            type="number"
            name="price"
            placeholder="Price (₹)"
            value={product.price}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="weight"
            placeholder="Weight (e.g. 500g)"
            value={product.weight}
            onChange={handleChange}
            required
          />
          <input type="file" accept="image/*" onChange={handleImage} />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{ width: "100px", height: "100px", marginTop: "10px" }}
            />
          )}
          <button type="submit">Update Product</button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
