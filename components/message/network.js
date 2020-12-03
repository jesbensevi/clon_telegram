const express = require("express");
const response = require("../../network/response");
const controller = require("./controller");
const router = express.Router();

router.get("/", (req, res) => {
  const filterMessage = req.query.user || null;
  controller
    .getMessage(filterMessage)
    .then((messageList) => {
      response.success(req, res, messageList, 200);
    })
    .catch((e) => response.error(req, res, "Unexpected Error", 500, e));
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

router.delete("/:id", (req, res) => {
  controller
    .deleteMessage(req.params.id)
    .then(() => {
      response.success(req, res, "Se eliminaron los datos", 200);
    })
    .catch((e) => {
      response.error(req, res, "Error por ahi", 500, e);
    });
});

module.exports = router;
