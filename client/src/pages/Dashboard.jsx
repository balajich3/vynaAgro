import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [token]);

  return (
    <div className="dashboard">
      <h2>Welcome to Your Dashboard</h2>
      {user ? (
        <div className="user-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default Dashboard;
