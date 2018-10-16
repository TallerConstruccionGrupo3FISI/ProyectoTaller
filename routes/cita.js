
const express = require('express');
//const mongoose = require('mongoose');
const router = express.Router();
//const cliente = require("../models/cliente")();
const citaControlador = require("../controlador/citaControlador.js");
const autentificador = require("../controlador/autentificadorController.js");

router.route("/")
          .get(citaControlador.listar_citas)
          .post(citaControlador.crear_una_cita);
router.route("/:citaID")
          .get(citaControlador.leer_una_cita)
          .put(citaControlador.actualizar_una_cita)
          .delete(citaControlador.eliminar_una_cita);

module.exports = router;
