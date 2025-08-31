//Generates PDF invoice using Puppeteer.
import puppeteer from 'puppeteer';
import {IInvoice} from '../models/Invoice';

export const generateInvoicePDF = async (invoice: IInvoice) => {
  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          h1 { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background: #f4f4f4; }
        </style>
      </head>
      <body>
        <h1>Invoice #${invoice._id}</h1>
        <p><strong>Date:</strong> ${invoice.createdAt.toDateString()}</p>
        <table>
          <tr><th>Product</th><th>Qty</th><th>Rate</th><th>Total</th></tr>
          ${invoice.products
            .map(
              (p) =>
                `<tr><td>${p.name}</td><td>${p.qty}</td><td>₹${p.rate}</td><td>₹${
                  p.qty * p.rate
                }</td></tr>`
            )
            .join("")}
        </table>
        <h3>Total: ₹${invoice.totalAmount}</h3>
      </body>
    </html>
  `;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdf = await page.pdf({ format: "A4" });
  await browser.close();

  return pdf;
};