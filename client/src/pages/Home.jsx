import React, { useEffect, useState, useContext } from "react";
import axios from "../utils/axiosInstance";
import "../styles/Home.css";
import Testimonials from "../components/Testimonials";
import { CartContext } from "../context/CartContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const userName = localStorage.getItem("userName");
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
        console.log("Fetched products:", res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchAll();
  }, []);

  const filteredProducts = products.filter((item) => {
    const matchType = filterType === "All" || item.type === filterType;
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSearch;
  });

  // Reusable product listing section
  const renderProductSection = () => (
    <section className="products-section">
      <h2>Explore Our Products</h2>

      <div className="filter-bar">
        <label>Filter:</label>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="All">All</option>
          <option value="Solid">Solid</option>
          <option value="Powdered">Powdered</option>
          <option value="Liquid">Liquid</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>
      

      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <p>No products available.</p>
        ) : (
          filteredProducts.map((item) => (
            <div key={item._id} className="product-card">
              <img src={item.image} alt={item.name} />
              <div className="product-info">
                <h3>{item.name}</h3>
                <p>Type: {item.type}</p>
                <p>Weight: {item.weight}g</p>
                <p className="price">₹{item.price}</p>
                <button onClick={() => addToCart(item)}>Add to Cart</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* YouTube Video Section */}
<section className="video-section" style={{ marginBottom: "0" }}>
  <h2>Our Organic Jaggery Process</h2>
  <div className="video-container">
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/LzIsCpqe1to"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
</section>
{/* Certificates Section */}
<section className="certificates-section"style={{ marginTop: "0" }}>
  <h2>Our Certifications</h2>
  <div className="certificates-grid">
    <img src="images/Fssai-Logo-Vector.png" alt="FSSAI Certificate" />
    <img src="images/organic-india.jpg" alt="Organic India Certificate" />
    <img src="images/fda.png" alt="Quality Certification" />
    <img src="images/iso-9000.jpg" alt="Quality Certification" />
  </div>
</section>


    </section>
  );
  

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>
          Welcome {userName ? <span className="username">{userName}</span> : "to VYNA AGRO"}
        </h1>
        <p>100% Organic Jaggery | Traditionally Made | Certified Quality</p>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Bottom Explore Our Products */}
      {renderProductSection()}
    </div>
  );
};

export default Home;
