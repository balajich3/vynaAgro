import React from "react";
import "../styles/Testimonials.css";

const Testimonials = () => {
  const reviews = [
    {
      name: "Ravi Kumar",
      feedback:
        "Absolutely loved the organic jaggery from VYNA AGRO. It tastes pure and feels healthy. Highly recommended!",
    },
    {
      name: "Meena Sharma",
      feedback:
        "Glad I switched from white sugar to this jaggery. Their quality and packaging is top notch!",
    },
    {
      name: "Arjun Patel",
      feedback:
        "Timely delivery and excellent customer service. I'm now a loyal customer.",
    },
  ];

  return (
    <div className="testimonials-section">
      <h2>What Our Customers Say</h2>
      <div className="testimonials-grid">
        {reviews.map((review, index) => (
          <div key={index} className="testimonial-card">
            <p>"{review.feedback}"</p>
            <h4>- {review.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
