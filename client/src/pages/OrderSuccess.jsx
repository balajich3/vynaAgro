import React from "react";

const OrderSuccess = () => {
  const address = JSON.parse(localStorage.getItem("address"));
  const payment = localStorage.getItem("paymentMethod");

  return (
    <div className="text-center p-6">
      <h2 className="text-3xl font-bold text-green-600 mb-4">
        🎉 Order Placed Successfully!
      </h2>
      <p className="mb-2">Thank you for your purchase.</p>
      <div className="bg-gray-100 p-4 rounded max-w-md mx-auto mt-4">
        <h3 className="font-semibold mb-2">Delivery Address:</h3>
        <p>{address?.name}, {address?.phone}</p>
        <p>{address?.street}, {address?.city} - {address?.pincode}</p>
        <p className="mt-2"><strong>Payment Method:</strong> {payment}</p>
      </div>
    </div>
  );
};

export default OrderSuccess;
