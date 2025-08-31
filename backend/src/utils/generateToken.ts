//Creates JWT tokens for users.
import jwt from "jsonwebtoken";

const generateToken = (id: string) => {
  const SECRET = process.env.JWT_SECRET || "secretkey";
  return jwt.sign({ id }, SECRET, { expiresIn: "24h" });
};

export default generateToken;
