import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(form.password)) {
      setError(
        "Password must be at least 8 characters, include a number and an uppercase letter."
      );
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f3f3",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "'Amazon Ember', Arial, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px 40px 30px",
          maxWidth: "350px",
          width: "100%",
          borderRadius: "4px",
          boxShadow:
            "0 2px 4px rgb(0 0 0 / 0.2), 0 4px 12px rgb(0 0 0 / 0.1)",
        }}
      >
        {/* Logo */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <img
            src="/vynaLogo.avif"
            alt="VYNA AGRO Logo"
            style={{ width: "120px", objectFit: "contain" }}
          />
        </div>

        <h1
          style={{
            fontWeight: "600",
            fontSize: "28px",
            marginBottom: "20px",
            color: "#111",
          }}
        >
          Create Your Account
        </h1>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="name"
            style={{
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "6px",
              display: "block",
              color: "#111",
            }}
          >
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "18px",
              borderRadius: "3px",
              border: "1px solid #a6a6a6",
              fontSize: "16px",
            }}
          />

          <label
            htmlFor="email"
            style={{
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "6px",
              display: "block",
              color: "#111",
            }}
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "18px",
              borderRadius: "3px",
              border: "1px solid #a6a6a6",
              fontSize: "16px",
            }}
          />

          <label
            htmlFor="password"
            style={{
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "6px",
              display: "block",
              color: "#111",
            }}
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "18px",
              borderRadius: "3px",
              border: "1px solid #a6a6a6",
              fontSize: "16px",
            }}
          />

          {error && (
            <div
              style={{
                color: "#d93025",
                marginBottom: "15px",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#f0c14b",
              border: "1px solid #a88734",
              padding: "10px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
              borderRadius: "3px",
              boxShadow: "0 2px 0 rgb(184 164 74 / 0.4) inset",
              color: "#111",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor = "#ddb347")
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "#f0c14b")
            }
          >
            Register
          </button>
        </form>

        <p
          style={{
            fontSize: "14px",
            marginTop: "20px",
            color: "#555",
            textAlign: "center",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#007185",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Login here
          </Link>
        </p>

        <hr
          style={{
            marginTop: "30px",
            borderColor: "#ddd",
          }}
        />
      </div>
    </div>
  );
};

export default Register;
