import mongoose from "mongoose";

export interface ItemDoc extends mongoose.Document {
  name: string;
  description: string;
  amount: number;
}
