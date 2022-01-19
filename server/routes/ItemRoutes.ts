import express, { Request, Response } from "express";
import { NativeError } from "mongoose";

import { Item } from "../db/models/inventory";
import { IItem } from "../interfaces/Item";
import { ItemDoc } from "../interfaces/ItemDoc";
import { downloadResource } from "../functions/download";
import { alphaNumRegex } from "../constants";

const router = express.Router();

const testRegex = (details: IItem) => {
  const { name, description, amount } = details;

  let integer: string = "";
  try {
    integer = amount.toString();
  } catch (err) {
    return false;
  }

  return (
    alphaNumRegex.test(name) &&
    alphaNumRegex.test(description) &&
    alphaNumRegex.test(integer)
  );
};

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

  if (!testRegex(itemDetails)) {
    res.status(400).json({ message: "Invalid input" });
  } else {
    const item = Item.build(itemDetails);

    Item.create(item, (err: NativeError, newItem: ItemDoc) => {
      if (err) {
        res.json({ message: `Error adding new item: ${err}` });
      } else {
        res.json({ message: "Created successfully" });
      }
    });
  }
});

router.put("/:id", (req: Request, res: Response) => {
  const id: string = req.params.id;

  const item: IItem = req.body;

  if (!testRegex(item)) {
    res.status(400).json({ message: "Invalid input" });
  } else {
    Item.findByIdAndUpdate(id, item, (err: NativeError, newItem: ItemDoc) => {
      if (err) {
        res.json({ message: `Error updating item: ${err}` });
      } else {
        res.json({ message: "Item updated successfully" });
      }
    });
  }
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
