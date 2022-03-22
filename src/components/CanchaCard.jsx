import React from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function CanchaCard({
  cancha,
  mode,
  handleditid,
  handledeleteid,
}) {
  console.log(cancha);
  const { nombre, direccion, tel, imagen, id_cancha } = cancha;

  const imageUrl = `http://localhost:8000/images/${imagen}`;
  console.log(imageUrl);
  const cardImagestyle = {
    height: "30vh",
    objectFit: "contain",
  };

  return (
    <Col className="my-4 text-center">
      <Card>
        <Card.Img
          style={cardImagestyle}
          variant="top"
          src={imageUrl}
        ></Card.Img>
        <Card.Body>
          <Card.Title>{nombre}</Card.Title>
          <Card.Footer>
            <Col>{direccion}</Col>
            <Col>Tel: {tel}</Col>
          </Card.Footer>
          {mode === "misCanchas" && (
            <Row>
              <Col>
                <Button variant="light">
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() => {
                      handleditid(id_cancha);
                    }}
                  />
                </Button>

                <Button variant="light">
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => {
                      handledeleteid(id_cancha);
                    }}
                  />
                </Button>
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
}
