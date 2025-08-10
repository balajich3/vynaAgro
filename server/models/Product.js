const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  weight: String,
  image: String,
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
