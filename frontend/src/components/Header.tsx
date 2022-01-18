import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

export default function Header({ showForm }: { showForm: () => void }) {
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
      <Col xs={3} style={{ textAlign: "center" }}>
        <FontAwesomeIcon
          icon={faPlusSquare}
          size="2x"
          onClick={() => showForm()}
        ></FontAwesomeIcon>
      </Col>
    </Row>
  );
}
