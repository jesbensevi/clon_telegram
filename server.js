const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
require("dotenv").config();

db(process.env.MONGO_URL);

// const router = require("./components/message/network");
const router = require("./network/routes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(router);

//pasando el servidor
router(app);

app.use("/app", express.static("public"));

app.listen(3000, () => {
  console.log(process.env.MONGO_URL);
  console.log("iniciado en localhost:3000");
});
