import React, { createContext, useState, useEffect, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add product to cart (increase qty if exists)
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove product completely
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  // Update quantity directly
  const updateQuantity = (id, quantity) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Increment product quantity
  const incrementQty = (id) => {
    updateQuantity(id, (cart.find((item) => item._id === id)?.quantity || 0) + 1);
  };

  // Decrement product quantity
  const decrementQty = (id) => {
    updateQuantity(id, (cart.find((item) => item._id === id)?.quantity || 0) - 1);
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        incrementQty,
        decrementQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for easier access to CartContext
export const useCart = () => useContext(CartContext);
