import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

const Cart = () => {
  const { cart, removeFromCart, incrementQty, decrementQty } = useCart();
  const navigate = useNavigate();

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleBuyNow = () => {
    const token = localStorage.getItem("token"); // or your auth check
    if (!token) {
      alert("Please log in to proceed with checkout.");
      navigate("/login");
      return;
    }
    navigate("/address");
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-details">
                <h3>{item.name}</h3>
                <p className="price">₹{item.price} MRP</p>
                <div className="quantity-controls">
                  <button onClick={() => decrementQty(item._id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incrementQty(item._id)}>+</button>
                </div>
                <div className="cart-actions">
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                  <button
                    className="buy-btn"
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="total">
            <h3>Total: ₹{getTotalPrice()}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
