import express, { Request, Response } from "express";
import dotenv from "dotenv";
import ItemRoutes from "./routes/ItemRoutes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", ItemRoutes);

app.get("*", (req: Request, res: Response) => {
  res.json({ message: "Requested route not found" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server is running on port ${PORT}`);
});
