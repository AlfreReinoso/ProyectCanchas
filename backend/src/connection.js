const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "canchas",
});
connection.connect((error) => {
  if (error) {
    console.log("Error al conectar base de datos");
  } else {
    console.log("Conectado a BD");
  }
});
module.exports = connection;
