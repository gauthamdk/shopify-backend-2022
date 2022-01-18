import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

import { Item } from "./db/models/inventory";
import { IItem } from "./interfaces/Item";
import { ItemDoc } from "./interfaces/ItemDoc";
import { NativeError } from "mongoose";
import { downloadResource } from "./functions/download";
import { INSPECT_MAX_BYTES } from "buffer";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/display", (req: Request, res: Response) => {
  Item.find({}, (err: NativeError, items: ItemDoc[]) => {
    if (err) {
      res.send("Error retrieving items");
    } else {
      res.send(items);
    }
  });
});

app.post("/api/create", async (req: Request, res: Response) => {
  const newItem: IItem = req.body;

  const item = Item.build(newItem);

  Item.create(item, (err: NativeError, newItem: ItemDoc) => {
    if (err) {
      res.json({ message: `Error adding new item: ${err}` });
    } else {
      res.json({ message: "Created successfully" });
    }
  });
});

app.put("/api/:id", (req: Request, res: Response) => {
  const id: string = req.params.id;

  const item: IItem = req.body;

  Item.findByIdAndUpdate(id, item, (err: NativeError, newItem: ItemDoc) => {
    if (err) {
      res.json({ message: `Error updating item: ${err}` });
    } else {
      res.json({ message: "Item updated successfully" });
    }
  });
});

app.delete("/api/:id", (req: Request, res: Response) => {
  const id: string = req.params.id;
  Item.findByIdAndDelete(id, (err: NativeError) => {
    if (err) {
      res.json({ message: `Error deleting item: ${err}` });
    } else {
      res.json({ message: "Item deleted successfully" });
    }
  });
});

app.get("/api/download", async (req: Request, res: Response) => {
  const fields = [
    { label: "Name", value: "name" },
    { label: "Description", value: "description" },
    { label: "Amount", value: "amount" },
  ];

  Item.find({}, (err, items) => {
    if (err) {
      res.json({ message: "Error downloading data" });
    } else {
      return downloadResource(res, "items.csv", fields, items);
    }
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server is running on port ${PORT}`);
});
