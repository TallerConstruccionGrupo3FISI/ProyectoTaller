
const express = require('express');
//const mongoose = require('mongoose');
const router = express.Router();
//const cliente = require("../models/cliente")();
const banoCorteControlador = require("../controlador/banoCorteControlador.js");
const autentificador = require("../controlador/autentificadorController.js");

router.route("/")
          .get(banoCorteControlador.listar_banoCorte)
          .post(banoCorteControlador.crear_un_banoCorte);
router.route("/:banoCorteID")
          .get(banoCorteControlador.leer_un_banoCorte)
          .put(banoCorteControlador.actualizar_un_banoCorte)
          .delete(banoCorteControlador.eliminar_un_banoCorte);

module.exports = router;
