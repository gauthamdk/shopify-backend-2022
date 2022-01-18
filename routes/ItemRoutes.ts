import express, { Request, Response } from "express";
import { NativeError } from "mongoose";

import { Item } from "../db/models/inventory";
import { IItem } from "../interfaces/Item";
import { ItemDoc } from "../interfaces/ItemDoc";
import { downloadResource } from "../functions/download";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  Item.find({}, (err: NativeError, items: ItemDoc[]) => {
    if (err) {
      res.json({ message: "Error retrieving items" });
    } else {
      res.send(items);
    }
  });
});

router.post("/", async (req: Request, res: Response) => {
  const itemDetails: IItem = req.body;

  const item = Item.build(itemDetails);

  Item.create(item, (err: NativeError, newItem: ItemDoc) => {
    if (err) {
      res.json({ message: `Error adding new item: ${err}` });
    } else {
      res.json({ message: "Created successfully" });
    }
  });
});

router.put("/:id", (req: Request, res: Response) => {
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

router.delete("/:id", (req: Request, res: Response) => {
  const id: string = req.params.id;
  Item.findByIdAndDelete(id, (err: NativeError) => {
    if (err) {
      res.json({ message: `Error deleting item: ${err}` });
    } else {
      res.json({ message: "Item deleted successfully" });
    }
  });
});

router.get("/download", async (req: Request, res: Response) => {
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

export default router;
