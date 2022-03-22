import React, { useEffect, useState } from "react";
import CanchaCard from "./CanchaCard";
import Row from "react-bootstrap/Row";
import ButtonNuevaCancha from "./ButtonNuevaCancha";
import Button from "react-bootstrap/esm/Button";
import LoginModal from "./LoginModal";
import CanchaEditorModal from "./CanchaEditorModal";

export default function CanchaList({ mode }) {
  const [canchas, setcanchas] = useState([]);
  const [showEditorModal, setEditorModal] = useState(false);
  const [canchaid, setcanchaid] = useState(null);

  const getFavs = async ({ infofavs }) => {
    const { id_cancha, id_usuario } = infofavs;
    let url = `http://localhost:8000/canchas/${id_cancha}`;
    const response = await fetch(url, {
      credentials: "include",
    });
    const data = await response.json();
    if (response.status === 200) {
      console.log(data);
      setcanchas(data);
    }
  };

  const handleNewPubClick = () => {
    setEditorModal(true);
    setcanchaid(null);
  };
  const handleHideModal = () => {
    setEditorModal(false);
  };
  const handleditid = (canchaid) => {
    setcanchaid(canchaid);
    setEditorModal(true);
  };
  const handledeleteid = (canchaid) => {
    const url = `http://localhost:8000/canchas/${canchaid}`;
    fetch(url, { method: "DELETE", credentials: "include" }).then(
      (response) => {
        response.json().then((data) => {
          console.log("cancha eliminada");
        });
      }
    );
  };

  const getCancha = async () => {
    let url = "http://localhost:8000/canchas";
    if (mode === "misCanchas") {
      url = "http://localhost:8000/canchas/misCanchas";
    } else if (mode === "favs") {
      url = "http://localhost:8000/canchas/favs";
    }

    const response = await fetch(url, {
      credentials: "include",
    });
    const data = await response.json();
    if (response.status === 200) {
      if (mode === "favs") {
        console.log("Por hacer get favs");
        getFavs(data);
        // setcanchas(data);
      } else {
        setcanchas(data);
      }
    }
  };

  useEffect(() => {
    getCancha();
  }, [mode]);
  return (
    <>
      {mode === "misCanchas" && (
        <ButtonNuevaCancha handleNewPubClick={handleNewPubClick} />
      )}
      <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 ">
        {canchas.map((cancha) => (
          <CanchaCard
            cancha={cancha}
            mode={mode}
            handleditid={handleditid}
            handledeleteid={handledeleteid}
          />
        ))}
      </Row>

      <CanchaEditorModal
        showLogin={showEditorModal}
        handleClose={handleHideModal}
        canchaid={canchaid}
      />
    </>
  );
}
