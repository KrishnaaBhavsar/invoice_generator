import { Request, Response } from "express";
import Invoice from "../models/Invoice";
import { generateInvoicePDF } from "../utils/pdfGenerator";
import Product from "../models/Product";

// Create a new invoice
export const createInvoice = async (req: Request, res: Response) => {
    try {
    const userId = (req as any).userId;

     if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No userId found" });
    }

    //  Fetch products of this user
    const products = await Product.find({ userId });

    if (!products.length) {
      return res.status(404).json({ message: "No products found for invoice" });
    }

    const totalAmount = products.reduce((sum, p) => sum + p.qty * p.rate, 0);

    // Save invoice in DB
    const invoice = await Invoice.create({
      userId,
      products,
      totalAmount,
    });

    //  Generate PDF
    const pdfBuffer = await generateInvoicePDF(invoice);

    //  Send PDF as download
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=invoice-${invoice._id}.pdf`,
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating invoice" });
  }
};
        