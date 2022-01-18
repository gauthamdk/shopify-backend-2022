import axios from "axios";

const getData = async () => {
  const res = await axios.get("/api");
  return res.data;
};

export default getData;
