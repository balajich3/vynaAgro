import React from "react";

const Product = ({ product, onDelete, onEdit }) => {
  const role = localStorage.getItem("role");

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} style={{ width: "150px" }} />
      <h3>{product.name}</h3>
      <p>Type: {product.type}</p>
      <p>Price: ₹{product.price}</p>
      <p>Weight: {product.weight}</p>

      {/* Show Edit and Delete buttons only for admin */}
      {role === "admin" && (
        <>
          <button onClick={onEdit}>Edit</button>
          <button
            onClick={(e) => {
              e.preventDefault(); // prevent navigation since product card might be wrapped in a Link
              onDelete();
            }}
            style={{ marginLeft: "10px", color: "red" }}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default Product;
