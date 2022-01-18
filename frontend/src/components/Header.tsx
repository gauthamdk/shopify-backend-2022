import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faWindowClose,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import fileDownload from "js-file-download";
import "../App.css";

export default function Header({ showForm }: { showForm: () => void }) {
  const [close, setClose] = useState(false);

  const downloadCSV = async () => {
    try {
      const res = await axios.get("/api/download");
      fileDownload(res.data, "items.csv");
    } catch (error) {}
  };

  return (
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
      <Col xs={3} className="d-flex justify-content-around">
        {close ? (
          <FontAwesomeIcon
            size="2x"
            icon={faWindowClose}
            onClick={() => {
              showForm();
              setClose(false);
            }}
            className="pointer"
          />
        ) : (
          <FontAwesomeIcon
            icon={faPlusSquare}
            size="2x"
            onClick={() => {
              showForm();
              setClose(true);
            }}
            className="pointer"
          />
        )}
        <FontAwesomeIcon
          icon={faDownload}
          size="2x"
          onClick={() => downloadCSV()}
          className="pointer"
        />
      </Col>
    </Row>
  );
}
