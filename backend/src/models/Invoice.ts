import mongoose, {Schema,Document} from 'mongoose';

export interface IInvoice extends Document {
  userId: string;
  products: {
    name: string;
    qty: number;
    rate: number;
  }[];
  totalAmount: number;
  createdAt: Date;
  pdfUrl?: string; // optional if you want to save file location
}

const InvoiceSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        rate: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    pdfUrl: { type: String }, // optional
  },
  { timestamps: true }
);

export default mongoose.model<IInvoice>("Invoice", InvoiceSchema);