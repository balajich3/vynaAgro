import React, { useState } from "react";
import axios from "../utils/axiosInstance"; // ✅ make sure this exists
import "../styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/contact", formData); // ✅ sends POST request to /api/contact
      alert("Message submitted successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p>We'd love to hear from you. Reach out with any questions or feedback!</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            required
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
