//Handles product-related endpoints (create, list, invoice).

import express from "express";
import { addProduct, getProducts } from "../controllers/productController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/add", authMiddleware, addProduct);
router.get("/",authMiddleware, getProducts);

export default router;
