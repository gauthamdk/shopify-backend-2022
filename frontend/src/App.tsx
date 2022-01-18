import React, { useState, useEffect } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";

import { ItemDoc } from "./interfaces/ItemDoc";
import AddItem from "./components/AddItem";
import getData from "./functions/getData";
import DisplayItem from "./components/DisplayItem";
import Header from "./components/Header";

function App() {
  // todo: add type
  const [items, setItems] = useState<ItemDoc[]>([]);

  const [create, setCreate] = useState(false);

  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const showForm = () => {
    setCreate(!create);
  };

  const fetchData = async () => {
    const data = await getData();
    setItems(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <h1 className="App">Inventory Tracking</h1>
      <div>
        <Header showForm={showForm} />
        {successMsg}
        {errMsg}
        {items.length > 0 ? (
          items.map((item) => {
            return <DisplayItem getItems={fetchData} item={item} />;
          })
        ) : (
          <></>
        )}
        {create ? <AddItem getItems={fetchData} /> : <></>}
      </div>
    </Container>
  );
}

export default App;
