import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";

import { useState } from "react";

export default function LoginModal({ showLogin, handleClose, setUsuario }) {
  const [email, setEmail] = useState(null);
  const [password, setPass] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePassChange = (event) => {
    setPass(event.target.value);
  };
  const handleSucces = async () => {
    const loginuser = { email, password };

    const url = "http://localhost:8000/auth";

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(loginuser),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await response.json();

    if (response.status === 200) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Sesion iniciada",
        showConfirmButton: false,
        timer: 1500,
      });
      setUsuario(data.nombre);
    } else {
      Swal.fire({
        icon: "error",
        text: data.message,
      });
    }
    handleClose();
  };

  return (
    <>
      <Modal show={showLogin} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Inicio de Sesion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={handleEmailChange}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Password"
                onChange={handlePassChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSucces}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
