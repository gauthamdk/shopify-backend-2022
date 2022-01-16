import express, { Request, Response } from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.get("/api", (req: Request, res: Response) => {
  res.send("You have reached the express server");
});

const PORT = 8080;

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server is running on port ${PORT}`);
});
