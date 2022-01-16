import mongoose from "mongoose";
const connectionString = process.env.MONGO_URI;

const connect = () => {
  return mongoose.connect(connectionString, {});
};

export default connect;
