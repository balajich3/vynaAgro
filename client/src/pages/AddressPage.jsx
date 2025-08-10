import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddressPage = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("address", JSON.stringify(address));
    navigate("/payment");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Enter Delivery Address</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" required
          value={address.name} onChange={handleChange} className="border p-2 w-full" />
        <input type="tel" name="phone" placeholder="Phone Number" required
          value={address.phone} onChange={handleChange} className="border p-2 w-full" />
        <input type="text" name="street" placeholder="Street Address" required
          value={address.street} onChange={handleChange} className="border p-2 w-full" />
        <input type="text" name="city" placeholder="City" required
          value={address.city} onChange={handleChange} className="border p-2 w-full" />
        <input type="text" name="pincode" placeholder="Pincode" required
          value={address.pincode} onChange={handleChange} className="border p-2 w-full" />
        <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded">
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default AddressPage;
