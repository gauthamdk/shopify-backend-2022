import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { ObjectId } from "mongoose";

export default function EditItem({
  id,
  name,
  desc,
  amount,
  getItems,
  save,
}: {
  id: ObjectId;
  name: string;
  desc: string;
  amount: number;
  getItems: () => Promise<void>;
  save: React.Dispatch<React.SetStateAction<boolean>>;
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

      getItems();
    } catch (err: any) {}
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editItem(id, newName, newDesc, newAmount);
    save(false);
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Row>
        <Col xs={3}>
          <Form.Group className="mb-3" controlId="formName">
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
        </Col>
        <Col xs={4}>
          <Form.Group className="mb-3" controlId="formDescription">
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
        </Col>
        <Col xs={2}>
          <Form.Group className="mb-3" controlId="formAmount">
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
        </Col>
        <Col xs={3} style={{ textAlign: "center" }}>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
