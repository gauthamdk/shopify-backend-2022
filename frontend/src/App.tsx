import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import { IItem } from "./interfaces/Item";

function App() {
  const [items, setItems] = useState<IItem[]>([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/display");
      setItems(res.data);
    };

    getData();
  }, []);

  return (
    <>
      <div className="App">Front end</div>
      {items.length > 0 ? console.log(items) : <></>}
    </>
  );
}

export default App;
