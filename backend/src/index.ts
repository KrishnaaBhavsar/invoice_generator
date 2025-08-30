import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
dotenv.config();



const app = express();
app.use(cors());
app.use(express.json());
connectDB();


app.use("/api/auth", authRoutes);
app.use("/products", productRoutes);


const PORT= process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
