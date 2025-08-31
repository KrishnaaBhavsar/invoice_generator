// Functions for signup/login logic.
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user, { IUser } from "../models/user";   // ✅ lowercase import
import generateToken from "../utils/generateToken";


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

    // find user by email
    const foundUser: IUser | null = await user.findOne({ email }).exec();
    if (!foundUser) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // check password
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // ✅ Generate token using shared util (same secret as middleware)
    const token: string = generateToken(foundUser._id.toString());

    // success response
    res.json({
      message: "Login successful",
      token, // ✅ this is the same token your middleware will verify
      user: {
        id: foundUser._id.toString(),
        name: foundUser.name,
        email: foundUser.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error in login", error });
}

};
