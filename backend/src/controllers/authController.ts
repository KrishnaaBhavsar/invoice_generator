// Functions for signup/login logic.

import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user from "../models/user";   // ✅ lowercase import

const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// Signup
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await user.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in signup", error });
  }
};
 
// Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const foundUser = await user.findOne({ email });
    if (!foundUser) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: foundUser._id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful", token });
  } catch (error) {
  console.error("Login error:", error);  // 👈 log the real error
  res.status(500).json({ message: "Error in login", error });
}

};
