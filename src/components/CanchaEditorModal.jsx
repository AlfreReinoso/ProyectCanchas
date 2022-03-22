import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function CanchaEditor({ showLogin, handleClose, canchaid }) {
  const [canchanombre, setTitulo] = useState("");
  const [canchadir, setDir] = useState("");
  const [canchaTel, setTel] = useState("");
  const [canchaTipo, setTipo] = useState("");
  const [canchaPreview, setCanchaPreview] = useState("");
  const [canchaImagen, setImagen] = useState(null);

  const handleTitulo = (event) => {
    setTitulo(event.target.value);
  };
  const handleDir = (event) => {
    setDir(event.target.value);
  };
  const handleTipo = (event) => {
    setTipo(event.target.value);
  };
  const handleTel = (event) => {
    setTel(event.target.value);
  };
  const handleImagen = (event) => {
    setImagen(event.target.files[0]);
  };
  const handleSave = () => {
    let url = "http://localhost:8000/canchas";

    const data = new FormData();

    // nombre, tel, direccion, id_usuario, imagen, categoria
    data.append("nombre", canchanombre);
    data.append("tel", canchaTel);
    data.append("direccion", canchadir);
    data.append("imagen", canchaImagen);
    data.append("id_categoria", canchaTipo);

    let method = "POST";

    if (canchaid) {
      method = "PUT";
      url += `/${canchaid}`;
    }

    fetch(url, { method, body: data, credentials: "include" }).then(
      async (response) => {
        const data = await response.json();
        if (response.status === 200) {
          alert("cancha guardada");
        } else {
          alert("Error al guardar");
        }
      }
    );
    handleClose();
  };

  useEffect(() => {
    canchaImagen && setCanchaPreview(URL.createObjectURL(canchaImagen));
  }, [canchaImagen]);

  useEffect(() => {
    if (canchaid) {
      // Modo Edicion
      let url = `http://localhost:8000/canchas/${canchaid}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setTitulo(data.nombre);
          setDir(data.direccion);
          setTel(data.tel);
          setCanchaPreview(`http://localhost:8000/images/${data.imagen}`);
          setImagen("");
        });
    } else {
      console.log("modo nuevo");
    }
  }, [canchaid]);

  return (
    <Modal show={showLogin} onHide={handleClose}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>
            {canchaid ? "Editar Cancha" : "Nueva cancha"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Titulo</Form.Label>
              <Form.Control
                type="text"
                value={canchanombre}
                onChange={handleTitulo}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Direcion</Form.Label>
              <Form.Control
                type="text"
                value={canchadir}
                onChange={handleDir}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                as="select"
                value={canchaTipo}
                onChange={handleTipo}
              >
                <option value="1">Futbol</option>
                <option value="2">Padel</option>
                <option value="3">Tennis</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="text"
                value={canchaTel}
                onChange={handleTel}
              />
            </Form.Group>
            <Form.Group className="d-flex justify-content-center">
              <img
                alt="imagenpreview"
                style={{ height: "25vh" }}
                src={canchaPreview}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Imagen</Form.Label>
              <Form.Control type="file" onChange={handleImagen} />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Salir
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}
