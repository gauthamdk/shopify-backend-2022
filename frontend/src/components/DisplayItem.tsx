import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios, { AxiosError } from "axios";
import Button from "react-bootstrap/Button";
import EditItem from "./EditItem";
import { ObjectId } from "mongoose";
import { ItemDoc } from "../interfaces/ItemDoc";
import Alert from "react-bootstrap/Alert";

export default function DisplayItem({
  item,
  getItems,
  setSuccess,
  setErr,
}: {
  item: ItemDoc;
  getItems: () => Promise<void>;
  setSuccess: React.Dispatch<React.SetStateAction<string>>;
  setErr: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleDelete = async (id: ObjectId) => {
    try {
      const res = await axios.delete(`/api/${id}`);
      getItems();
      setSuccess(res.data.message);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError;
        if (serverError && serverError.response) {
          setErr(serverError.response.data.message);
        }
      }
    }
  };

  const [edit, setEdit] = useState(false);

  return (
    <>
      {edit ? (
        <EditItem
          id={item._id}
          name={item.name}
          desc={item.description}
          amount={item.amount}
          getItems={getItems}
          save={setEdit}
        />
      ) : (
        <Row className="mb-2" key={item._id}>
          <Col xs={3}>{item.name}</Col>
          <Col xs={4}>{item.description}</Col>
          <Col xs={2}>{item.amount}</Col>
          <Col xs={3} className="d-flex justify-content-around">
            <Button variant="primary" onClick={() => setEdit(!edit)}>
              Edit
            </Button>
            <Button variant="danger" onClick={() => handleDelete(item._id)}>
              Delete
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
}
