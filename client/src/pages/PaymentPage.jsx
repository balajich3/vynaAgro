import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState("COD");

  const handlePayment = () => {
    localStorage.setItem("paymentMethod", method);
    navigate("/order-success");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Select Payment Method</h2>
      <div className="space-y-3">
        {["COD", "UPI", "Credit/Debit Card"].map((m) => (
          <label key={m} className="flex items-center gap-2">
            <input type="radio" value={m} checked={method === m}
              onChange={(e) => setMethod(e.target.value)} />
            {m}
          </label>
        ))}
      </div>
      <button
        className="bg-blue-600 text-white mt-4 py-2 px-4 rounded"
        onClick={handlePayment}
      >
        Place Order
      </button>
    </div>
  );
};

export default PaymentPage;
