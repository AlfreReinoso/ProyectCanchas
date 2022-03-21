const express = require("express");
const cors = require("cors");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const fileUpload = require("express-fileupload");
var path = require("path");

const canchasroutes = require("./routes/canchas");
const authroutes = require("./routes/auth");

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(fileUpload());

app.use(
  session({
    secret: "jaklsdjfklajslkjasñdkl",
    name: "clonmeli",
    saveUninitialized: true,
    resave: false,
    store: new FileStore(),
  })
);

// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use("/canchas", canchasroutes);
app.use("/auth", authroutes);

app.listen(8000, () => {
  console.log("Servidor en puerto 8000");
});
