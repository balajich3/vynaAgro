import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} VYNA AGRO. All rights reserved.</p>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/contact">Contact Us</a>
          <a href="/about">About</a>
        </div>
        <div className="footer-social">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
