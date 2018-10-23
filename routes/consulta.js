
const express = require('express');
//const mongoose = require('mongoose');
const router = express.Router();
//const cliente = require("../models/cliente")();
const consultaControlador = require("../controlador/consultaControlador.js");
const autentificador = require("../controlador/autentificadorController.js");

router.route("/")
          .get(consultaControlador.listar_consultas)
          .post(consultaControlador.crear_una_consulta);
router.route("/:consultaID")
          .get(consultaControlador.leer_una_consulta)
          .put(consultaControlador.actualizar_una_consulta)
          .delete(consultaControlador.eliminar_una_consulta);

module.exports = router;
