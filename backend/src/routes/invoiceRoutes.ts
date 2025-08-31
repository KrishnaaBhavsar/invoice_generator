import express from 'express';

import { createInvoice } from '../controllers/invoiceController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post("/", authMiddleware, createInvoice);
export default router;
// Invoice routes