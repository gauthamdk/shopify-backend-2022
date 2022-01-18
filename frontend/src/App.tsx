import React, { useState, useEffect } from "react";
import "./App.css";
import axios, { AxiosError } from "axios";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { ObjectId } from "mongoose";

import { IItem } from "./interfaces/Item";
import AddItem from "./components/AddItem";
import getData from "./functions/getData";
import DisplayItem from "./components/DisplayItem";

function App() {
  // todo: add type
  const [items, setItems] = useState<any[]>([]);

  const [create, setCreate] = useState(false);
  const [visible, setVisible] = useState({});

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
        <Row>
          <Col xs={3}>
            <h2>Name</h2>
          </Col>
          <Col xs={4}>
            <h2>Description</h2>
          </Col>
          <Col xs={2}>
            <h2>Amount</h2>
          </Col>
          <Col xs={3} style={{ textAlign: "center" }}>
            <FontAwesomeIcon
              icon={faPlusSquare}
              size="2x"
              onClick={() => showForm()}
            ></FontAwesomeIcon>
          </Col>
        </Row>
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
