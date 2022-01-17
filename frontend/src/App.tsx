import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

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
          <Col xs={3}>Plus</Col>
        </Row>
        <Row>
          {items.length > 0 ? (
            items.map((item) => {
              return (
                <>
                  <Col xs={3}>{item.name}</Col>
                  <Col xs={4}>{item.description}</Col>
                  <Col xs={2}>{item.amount}</Col>
                  <Col xs={3}>
                    <Button variant="primary">Edit</Button>{" "}
                    <Button variant="danger">Delete</Button>
                  </Col>
                </>
              );
            })
          ) : (
            <></>
          )}
        </Row>
      </div>
    </Container>
  );
}

export default App;
