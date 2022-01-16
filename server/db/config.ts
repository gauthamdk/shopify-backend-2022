import { MongoClient } from "mongodb";
const connectionString = process.env.MONGO_URI;

const connect = () => {
  return new MongoClient(connectionString, {}).connect();
};

export default connect;
