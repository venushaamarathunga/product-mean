import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(`Error : ${error.message}`);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ success: false, message: "Please add all fields." });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error(`Error : ${error.message}`);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid product Id." });
  }

  if (!product || Object.keys(product).length === 0) {
    return res.status(400).json({ success: false, message: "Product data is required." });
  }

  try {
    const updateProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({ success: true, data: updateProduct });
  } catch (error) {
    console.error(`Error : ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error." });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid product Id." });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, data: "Delete the product." });
  } catch (error) {
    console.error(`Error : ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error." });
  }
};
