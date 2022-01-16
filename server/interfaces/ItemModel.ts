import mongoose from "mongoose";
import { IItem } from "./Item";
import { ItemDoc } from "./ItemDoc";

export interface ItemModelInterface extends mongoose.Model<ItemDoc> {
  build(attr: IItem): ItemDoc;
}
