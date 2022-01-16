import express, { application, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

import { Item } from "./db/models/inventory";
import { IItem } from "./interfaces/Item";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req: Request, res: Response) => {
  res.send("You have reached the express server dist");
});

app.post("/api/create", async (req: Request, res: Response) => {
  const {
    name,
    description,
    amount,
  }: { name: string; description: string; amount: number } = req.body;

  const item = Item.build({ name, description, amount });
  // tslint:disable-next-line:no-console
  Item.create(item, (err: any, newItem: IItem) => {
    if (err) {
      res.json({ message: "error" + err });
    } else {
      res.json({ message: "created new item" });
    }
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server is running on port ${PORT}`);
});
