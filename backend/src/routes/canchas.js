const express = require("express");
const connection = require("../connection");
var path = require("path");
const fs = require("fs");

const router = express.Router();

router.get("/", (req, res) => {
  const sql = `SELECT *
                    FROM canchas`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error al obtener las canchas" });
    } else {
      res.status(200).json(result);
    }
  });
});
router.get("/misCanchas", (req, res) => {
  console.log(req.session.user.id_usuario);
  const sql = `SELECT *
                FROM canchas
                WHERE id_usuario = ${req.session.user.id_usuario}`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error al obtener tus canchas" });
    } else {
      res.status(200).json(result);
    }
  });
});

router.get("/:id_cancha", (req, res) => {
  const sql = `SELECT *
                    FROM canchas
                    WHERE id_cancha= ?`;
  values = [req.params.id_cancha];
  connection.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error al obtener las canchas" });
    } else {
      res.status(200).json(result[0]);
    }
  });
});

router.get("/favs", (req, res) => {
  console.log(req.session.user.id_usuario);
  console.log("Entrando a favs");
  const sql = `SELECT *
                    FROM favoritos
                    WHERE id_usuario = ${req.session.user.id_usuario}`;
  connection.query(sql, (err, result) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Error al obtener las canchas favoritas" });
    } else {
      console.log(result);
      res.status(200).json(result);
    }
  });
  // res.json([]);
});

router.post("/", (req, res) => {
  const { nombre, tel, direccion, id_categoria } = req.body;
  console.log(req.body, req.files);
  // console.log(req.session.user.id_usuario);
  let imageFileName = "";

  if (req.files) {
    const canchaImagen = req.files.imagen;

    const imageFileExt = path.extname(canchaImagen.name);

    imageFileName = Date.now() + imageFileExt;

    canchaImagen.mv(`backend/src/public/images/${imageFileName}`, (err) => {
      if (err) {
        console.log("error al subir imagen");
      } else {
        console.log("imagen subida correctly");
      }
    });
  }

  const idUsuario = req.session.user.id_usuario;

  const sql = `INSERT INTO canchas(nombre, tel, direccion, id_usuario, imagen, id_categoria)
              VALUES (?, ?, ?, ?, ?, ?)`;

  const values = [
    nombre,
    tel,
    direccion,
    idUsuario,
    imageFileName,
    id_categoria,
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.log(err.message);
      res.status(500).json({ message: "Error al ingresar cancha nueva" });
    } else {
      res.json({ message: "Cancha nueva ingresada" });
    }
  });
});

router.put("/:id_cancha", (req, res) => {
  const { nombre, tel, direccion, id_categoria } = req.body;

  const values = [nombre, tel, direccion, id_categoria];

  // const idUsuario = req.session.user.id_usuario;
  let sqlUpdate = `UPDATE canchas SET nombre = ?, 
                                  tel= ?, 
                                  direccion = ?, 
                                  id_categoria = ? `;

  let imageFileName = "";

  if (req.files) {
    const sql = `SELECT imagen
                FROM canchas 
                WHERE id_cancha = ? `;

    connection.query(sql, [req.params.id_cancha], (err, result) => {
      if (err) {
        console.log("error al obtener imagen");
      } else {
        const imagenBorrar = result[0].imagen;
        fs.unlink(`backend/src/public/images/${imagenBorrar}`, (err) => {
          if (err) {
            console.log("no se pudo borrar la imagen");
          } else {
            console.log("imagen borrada exitosamente");
          }
        });
      }
    });

    // Subida de nueva imagen

    const canchaImagen = req.files.imagen;

    const imageFileExt = path.extname(canchaImagen.name);

    imageFileName = Date.now() + imageFileExt;

    canchaImagen.mv(`backend/src/public/images/${imageFileName}`, (err) => {
      if (err) {
        console.log("error al subir imagen");
      } else {
        console.log("imagen subida correctly");
      }
    });
    sqlUpdate += `, imagen = ? `;
    values.push(imageFileName);
  }

  sqlUpdate += `WHERE id_cancha= ? `;
  values.push(req.params.id_cancha);

  connection.query(sqlUpdate, values, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error al modificar" });
    } else {
      res.json({ message: "Editado correctamente" });
    }
  });
});

router.delete("/:id_cancha", (req, res) => {
  const sql = `DELETE
               FROM canchas              
               WHERE id_cancha = ?`;

  const values = [req.params.id_cancha];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.log(err.message);
      res.status(500).json({ message: "Error al eliminar la publicación." });
    } else {
      res.json({ message: "Publicación eliminada correctamente." });
    }
  });
});

module.exports = router;
