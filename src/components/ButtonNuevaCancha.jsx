import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function ({ handleNewPubClick }) {
  return (
    <Row className="my-2 ml-2">
      <Col>
        <Button variant="primary" size="md" onClick={handleNewPubClick}>
          Nueva Cancha
        </Button>
      </Col>
    </Row>
  );
}
