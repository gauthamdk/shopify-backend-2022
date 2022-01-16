import mongoose from "mongoose";

import connect from "../config";
import { Item } from "../../interfaces/Item";

connect();

const items = new mongoose.Schema<Item>({});
