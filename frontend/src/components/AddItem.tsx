import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import axios, { AxiosError } from "axios";
import "../App.css";

export default function AddItem({
  getItems,
}: {
  getItems: () => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState(0);

  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const addItem = async (name: string, description: string, amount: number) => {
    try {
      const res = await axios.post("/api", {
        name: name,
        description: description,
        amount: amount,
      });

      setSuccessMsg(res.data.message);
      getItems();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError;
        if (serverError && serverError.response) {
          setErrMsg(serverError.response.data.message);
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addItem(name, desc, amount);
  };

  return (
    <Container className="addItem">
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            placeholder="Name of item"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            type="text"
            name="desc"
            placeholder="Short description"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAmount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            required
            type="number"
            min="0"
            name="amount"
            placeholder="Number in stock"
            onChange={(e) => {
              setAmount(parseInt(e.target.value));
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Item
        </Button>
      </Form>
      {successMsg.length > 0 ? (
        <Alert variant="success">{successMsg}</Alert>
      ) : (
        <></>
      )}
      {errMsg.length > 0 ? <Alert variant="danger">{errMsg}</Alert> : <></>}
    </Container>
  );
}
