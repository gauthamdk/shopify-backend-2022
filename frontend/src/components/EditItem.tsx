import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { ObjectId } from "mongoose";

export default function EditItem({
  id,
  name,
  desc,
  amount,
  getItems,
}: {
  id: ObjectId;
  name: string;
  desc: string;
  amount: number;
  getItems: () => Promise<void>;
}) {
  const [newName, setNewName] = useState(name);
  const [newDesc, setNewDesc] = useState(desc);
  const [newAmount, setNewAmount] = useState(amount);

  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const editItem = async (
    id: ObjectId,
    name: string,
    description: string,
    amount: number
  ) => {
    try {
      const res = await axios.put(`/api/${id}`, {
        name: name,
        description: description,
        amount: amount,
      });

      setSuccessMsg(res.data.message);
      getItems();
    } catch (err: any) {
      setErrMsg(err.response.data.message);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editItem(id, newName, newDesc, newAmount);
  };

  return (
    <Container>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={newName}
            placeholder="Name of item"
            onChange={(e) => {
              setNewName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="desc"
            value={newDesc}
            placeholder="Short description"
            onChange={(e) => {
              setNewDesc(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAmount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            min="0"
            name="amount"
            value={newAmount}
            placeholder="Number in stock"
            onChange={(e) => {
              setNewAmount(parseInt(e.target.value));
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </Container>
  );
}
