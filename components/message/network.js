const express = require("express");
const response = require("../../network/response");
const controller = require("./controller");
const router = express.Router();

router.get("/", (req, res) => {
  controller
    .getMessage()
    .then((messageList) => {
      response.success(req, res, messageList, 200);
    })
    .catch((e) => response.error(req, res, "Unexpected Error", 500, e));
});

router.delete("/", (req, res) => {
  console.log(req.body);
  res.send("Hola desde delete");
});

router.post("/", function (req, res) {
  controller
    .addMessage(req.body.user, req.body.message)
    .then((fullMessage) => {
      response.success(req, res, fullMessage, 201);
    })
    .catch((e) => {
      response.error(
        req,
        res,
        "Informacion invalida",
        400,
        "Error en el controller"
      );
    });

  // res.send(`enviando la palabra ${req.body.text}`);
  // res.status(201).send({ error: "", body: "Creado Correctamente" });
});

router.patch("/:id", (req, res) => {
  controller
    .updateMessage(req.params.id, req.body.message)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((e) => {
      response.error(req, res, "Error en la matrix", 500, e);
    });
});

module.exports = router;
