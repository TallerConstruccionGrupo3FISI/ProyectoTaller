
const express = require('express');
//const mongoose = require('mongoose');
const router = express.Router();
//const cliente = require("../models/cliente")();
const citaControlador = require("../controlador/citaControlador.js");
const autentificador = require("../controlador/autentificadorController.js");

router.route("/")
          .get(citaControlador.listar_citas,autentificador.loginRequired)
          .post(citaControlador.crear_una_cita,autentificador.loginRequired);
router.route("/:citaID")
          .get(citaControlador.leer_una_cita,autentificador.loginRequired)
          .put(citaControlador.actualizar_una_cita,autentificador.loginRequired)
          .delete(citaControlador.eliminar_una_cita,autentificador.loginRequired);
router.route("/fecha/:fecha")
          .get(citaControlador.leer_una_cita_x_fecha,autentificador.loginRequired);
module.exports = router;
