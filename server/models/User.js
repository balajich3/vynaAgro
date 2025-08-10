// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add role here with default "customer"
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },
});

module.exports = mongoose.model("User", UserSchema);
