const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const verifyAdmin = require("../middleware/verifyAdmin");

// Get all products - public route
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch products" });
  }
});

// Get one product by ID - public route
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(404).json({ msg: "Product not found" });
  }
});

// Admin-only route to add a new product
router.post("/", verifyAdmin, async (req, res) => {
  const { name, type, price, weight, image } = req.body;

  if (!name || !type || !price || !weight || !image) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const newProduct = new Product({ name, type, price, weight, image });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error saving product:", err);
    res.status(500).json({ msg: "Failed to add product" });
  }
});

// Admin-only route to edit a product by ID
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ msg: "Product not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Failed to update product" });
  }
});

// Admin-only route to delete a product by ID
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Product not found" });
    res.json({ msg: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete product" });
  }
});

module.exports = router;
