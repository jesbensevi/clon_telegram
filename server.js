const express = require("express");
const bodyParser = require("body-parser");

// const router = require("./components/message/network");
const router = require("./network/routes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(router);

//pasando el servidor
router(app);

app.use("/app", express.static("public"));

app.listen(3000);
console.log("iniciado en localhost:3000");
