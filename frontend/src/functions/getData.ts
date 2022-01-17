import axios from "axios";

const getData = async () => {
  const res = await axios.get("/api/display");
  return res.data;
};

export default getData;
