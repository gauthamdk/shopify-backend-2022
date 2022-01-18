import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faWindowClose } from "@fortawesome/free-solid-svg-icons";

export default function Header({ showForm }: { showForm: () => void }) {
  const [close, setClose] = useState(false);
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
        {close ? (
          <FontAwesomeIcon
            size="2x"
            icon={faWindowClose}
            onClick={() => {
              showForm();
              setClose(false);
            }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faPlusSquare}
            size="2x"
            onClick={() => {
              showForm();
              setClose(true);
            }}
          />
        )}
      </Col>
    </Row>
  );
}
