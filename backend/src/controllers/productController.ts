//Functions for product logic.

import { Request, Response } from "express";
import Product from "../models/Product";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, qty, rate } = req.body;

    if (!name || !qty || !rate ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const total = qty * rate;
    const gst = total * 0.18;

    const product = new Product({
      name,
      qty,
      rate,
      total,
      gst,
      userId: req.userId,
    });

    await product.save();
    res.status(201).json({ message: "Product added", product });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
};

// Get all products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ userId: req.userId }); // ✅ use req.userId
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};


