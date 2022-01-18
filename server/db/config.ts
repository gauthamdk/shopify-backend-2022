import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.MONGO_URI;

const connect = () => {
  return mongoose.connect(connectionString, {});
};

export default connect;
