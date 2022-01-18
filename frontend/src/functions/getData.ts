import axios from "axios";

const getData = async () => {
  try {
    const res = await axios.get("/api");
    return res.data;
  } catch (err) {
    return err;
  }
};

export default getData;
