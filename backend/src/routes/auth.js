const express = require("express");
const connection = require("../connection");

const router = express.Router();

router.get("/check", (req, res) => {
  if (req.session.user) {
    res.json({ nombre: req.session.user.nombre });
  } else {
    res.status(401).json({ message: "Usuario invalido" });
  }
});

router.delete("/", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: "Error al cerrar sesion" });
    } else {
      res.json({ message: "Sesion cerrada" });
    }
  });
});

router.post("/", (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * 
                    FROM usuarios
                    WHERE email = ? AND password=?`;
  const values = [email, password];
  connection.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error al iniciar sesion" });
    } else {
      if (result.length === 1) {
        req.session.user = result[0];
        res.json({ message: "Usuario valido", nombre: result[0].nombre });
      } else {
        res.status(401).json({ message: "Usuario invalido" });
      }
    }
  });
  console.log(`Email:${email} y password:${password}`);
});
module.exports = router;
