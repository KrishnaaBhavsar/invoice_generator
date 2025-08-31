//Schema for user (name, email, password).

import mongoose, { Document, Schema, Types } from "mongoose";

export interface IUser extends Document {
  _id:Types.ObjectId;
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const user = mongoose.model<IUser>("user", userSchema);

export default user;

