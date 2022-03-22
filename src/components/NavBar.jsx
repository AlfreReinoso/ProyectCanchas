import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import LoginModal from "./LoginModal";
import { Link } from "react-router-dom";

export default function BarraDeNav() {
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);

  const handleShowLogin = () => {
    setShow(true);
  };

  const handleHideLogin = () => {
    setShow(false);
  };

  const handlelogout = async () => {
    const url = "http://localhost:8000/auth";
    const response = await fetch(url, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await response.json();

    if (response.status === 200) {
      console.log(data);
      setUser(null);
    }
  };

  const checkLogin = async () => {
    const url = "http://localhost:8000/auth/check";
    const response = await fetch(url, {
      credentials: "include",
    });
    const data = await response.json();

    if (response.status === 200) {
      console.log(data);
      setUser(data.nombre);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const containerStyle = {
    backgroundImage:
      "url(https://zoovetesmipasion.com/wp-content/uploads/2017/08/pasto-731x410.jpg)",
    objectfit: "contain",
  };

  return (
    <Navbar style={containerStyle} bg="dark" expand="lg">
      <Container>
        <Link className="nav-link" to="/">
          <Navbar.Brand>Canchas</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {user ? (
              <>
                <Link className="nav-link" to="/favs">
                  Favoritas
                </Link>
                <Link className="nav-link" to="/misCanchas">
                  Mis canchas
                </Link>
                <NavDropdown title={user} id="basic-nav-dropdown">
                  <NavDropdown.Item>Mi perfil</NavDropdown.Item>
                  <NavDropdown.Item onClick={handlelogout}>
                    Cerrar Sesion
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Button className="btn-primary" onClick={handleShowLogin}>
                Iniciar sesion
              </Button>
            )}
          </Nav>
          <LoginModal
            showLogin={show}
            handleClose={handleHideLogin}
            setUsuario={setUser}
          />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
