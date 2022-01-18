import React, { useState, useEffect } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";

import { ItemDoc } from "./interfaces/ItemDoc";
import AddItem from "./components/AddItem";
import getData from "./functions/getData";
import DisplayItem from "./components/DisplayItem";
import Header from "./components/Header";
import Alert from "react-bootstrap/Alert";

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
    <Container className="App">
      <h1>Inventory Tracking</h1>
      <div>
        <Header showForm={showForm} />
        {successMsg.length > 0 ? (
          <Alert variant="success">{successMsg}</Alert>
        ) : (
          <></>
        )}
        {errMsg.length > 0 ? <Alert variant="danger">{errMsg}</Alert> : <></>}
        {create ? <AddItem getItems={fetchData} /> : <></>}
        {items.length > 0 ? (
          items.map((item) => {
            return (
              <DisplayItem
                key={item._id}
                getItems={fetchData}
                item={item}
                setSuccess={setSuccessMsg}
                setErr={setErrMsg}
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
    </Container>
  );
}

export default App;
