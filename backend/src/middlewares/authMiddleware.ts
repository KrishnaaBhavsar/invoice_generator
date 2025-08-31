//Verifies JWT token for protected routes.

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  console.log("Auth Header Received:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Extracted Token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey") as JwtPayload;
    console.log("Decoded Payload:", decoded);
    req.userId = decoded.id; // ✅ inject userId automatically
    next();
  } catch (error) {
    console.error("JWT Verify Error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
