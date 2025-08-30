//Schema for product/invoice items.
import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  qty: number;
  rate: number;
  total: number;
  gst: number;
  user: mongoose.Schema.Types.ObjectId;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  rate: { type: Number, required: true },
  total: { type: Number, required: true },
  gst: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: "user", required: true },
});

const Product = mongoose.model<IProduct>("product", productSchema);
export default Product;
