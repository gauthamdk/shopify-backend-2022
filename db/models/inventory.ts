import mongoose from "mongoose";

import connect from "../config";
import { IItem } from "../../interfaces/Item";
import { ItemModelInterface } from "../../interfaces/ItemModel";
import { ItemDoc } from "../../interfaces/ItemDoc";

connect();

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

itemSchema.statics.build = (attr: IItem) => {
  return new Item(attr);
};

const Item = mongoose.model<ItemDoc, ItemModelInterface>("items", itemSchema);

export { Item };
